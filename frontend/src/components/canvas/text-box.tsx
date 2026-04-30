import React, { useState, useRef } from 'react';
import styles from './text-box.module.css';

// 8방향 리사이즈 핸들 + 이동(move) + 비활성(null)
type HandleType = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'move' | null;

interface Props {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  onChange?: (rect: { x: number; y: number; w: number; h: number }) => void;
  // true면 드래그·리사이즈 비활성화 (썸네일용 읽기 전용 렌더링)
  isThumbnail?: boolean;
  children?: React.ReactNode;
}

export default function TextBox({
  x, y, w, h,
  onChange,
  isThumbnail = false,
  children,
}: Props) {
  // props 미전달 시 기본값
  const safeX = x ?? 100;
  const safeY = y ?? 100;
  const safeW = w ?? 500;
  const safeH = h ?? 150;

  // rect: 드래그 중 화면에 보이는 위치/크기 (로컬 상태)
  // 슬라이드 전환 시 재마운트되도록 SlideContent에서 key={slide.id}를 전달하므로
  // useEffect로 props를 동기화할 필요 없음
  const [rect, setRect] = useState({ x: safeX, y: safeY, w: safeW, h: safeH });
  const [isActive, setIsActive] = useState(false);

  // activeHandle: 현재 누르고 있는 핸들 종류 (null이면 아무것도 안 누름)
  const activeHandle = useRef<HandleType>(null);
  // hasDragged: 실제로 드래그가 발생했는지 추적 (클릭만 한 경우 onChange 미호출)
  const hasDragged = useRef(false);
  // startPos: pointerdown 시점의 마우스 좌표 + rect 스냅샷 (delta 계산용)
  const startPos = useRef({ x: 0, y: 0, rectX: 0, rectY: 0, rectW: 0, rectH: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 썸네일 모드: props로 받은 위치/크기를 그대로 렌더링
  // rect(state) 대신 safeX/Y/W/H(props 파생값)을 써야 스토어 변경이 즉시 반영됨
  if (isThumbnail) {
    return (
      <div
        style={{
          position: 'absolute',
          left: `${safeX}px`,
          top: `${safeY}px`,
          width: `${safeW}px`,
          height: `${safeH}px`,
          pointerEvents: 'none',
        }}
      >
        {children}
      </div>
    );
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, handle: HandleType) => {
    // textarea 클릭 시 텍스트 편집을 허용하고 드래그는 시작하지 않음
    if (handle === 'move' && (e.target as HTMLElement).tagName === 'TEXTAREA') {
      setIsActive(true);
      return;
    }
    e.stopPropagation();
    // setPointerCapture: 포인터가 요소 밖으로 나가도 이벤트를 계속 수신
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsActive(true);
    activeHandle.current = handle;
    hasDragged.current = false;
    containerRef.current?.focus();
    // pointerdown 시점의 마우스 좌표와 rect를 함께 저장해 delta 계산에 사용
    startPos.current = { x: e.clientX, y: e.clientY, rectX: rect.x, rectY: rect.y, rectW: rect.w, rectH: rect.h };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeHandle.current) return;
    hasDragged.current = true;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    // 항상 startPos 기준으로 계산해야 누적 오차가 없음
    const { rectX, rectY, rectW, rectH } = startPos.current;

    let newX = rectX, newY = rectY, newW = rectW, newH = rectH;

    if (activeHandle.current === 'move') {
      newX = rectX + deltaX; newY = rectY + deltaY;
    } else {
      // 핸들 이름(e/w/n/s 조합)으로 어느 방향이 변경되는지 판별
      const handle = activeHandle.current;
      if (handle.includes('e')) newW = rectW + deltaX;
      if (handle.includes('s')) newH = rectH + deltaY;
      if (handle.includes('w')) { newX = rectX + deltaX; newW = rectW - deltaX; }
      if (handle.includes('n')) { newY = rectY + deltaY; newH = rectH - deltaY; }
    }

    // 최소 크기 보장: x/y는 startPos 기준으로 보정해야 위치가 튀지 않음
    if (newW < 50) { newW = 50; newX = startPos.current.rectX + startPos.current.rectW - 50; }
    if (newH < 30) { newH = 30; newY = startPos.current.rectY + startPos.current.rectH - 30; }

    // 드래그 중에는 로컬 상태만 업데이트 (스토어·썸네일 갱신은 pointerup에서)
    setRect({ x: newX, y: newY, w: newW, h: newH });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    activeHandle.current = null;
    // 실제 드래그가 있었을 때만 스토어 동기화 (클릭 시 불필요한 업데이트 방지)
    if (hasDragged.current) onChange?.(rect);
    hasDragged.current = false;
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // 핸들을 잡고 있거나 포커스가 컨테이너 내부로 이동한 경우 비활성화하지 않음
    if (activeHandle.current || e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsActive(false);
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isActive ? styles.active : ''}`}
      style={{ left: `${rect.x}px`, top: `${rect.y}px`, width: `${rect.w}px`, height: `${rect.h}px` }}
      tabIndex={-1}
      onBlur={handleBlur}
    >
      {/* dragBody: 박스 전체 영역에서 이동 드래그를 처리 */}
      <div className={styles.dragBody} onPointerDown={(e) => handlePointerDown(e, 'move')} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
        {children}
      </div>
      {/* 8방향 리사이즈 핸들: 방향 이름이 CSS 클래스명과 동일 */}
      {['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].map((dir) => (
        <div key={dir} className={`${styles.handle} ${styles[dir]}`} onPointerDown={(e) => handlePointerDown(e, dir as HandleType)} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} />
      ))}
    </div>
  );
}
