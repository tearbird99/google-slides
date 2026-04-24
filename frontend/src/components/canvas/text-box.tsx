import React, { useState, useRef } from 'react';
import styles from './text-box.module.css';

type HandleType = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'move' | null;

interface Props {
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  children?: React.ReactNode;
}

export default function TextBox({
  initialX = 100,
  initialY = 100,
  initialWidth = 500,
  initialHeight = 150,
  children,
}: Props) {
  //  props로 null이나 이상한 값이 넘어와도 안전하게 숫자로 보정.
  const [rect, setRect] = useState({
    x: Number(initialX) || 100,
    y: Number(initialY) || 100,
    w: Number(initialWidth) || 500,
    h: Number(initialHeight) || 150,
  });
  
  const [isActive, setIsActive] = useState(false);
  const activeHandle = useRef<HandleType>(null);
  const startPos = useRef({ x: 0, y: 0, rectX: 0, rectY: 0, rectW: 0, rectH: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, handle: HandleType) => {
    // 사용자가 textarea를 직접 클릭한 경우 드래그 로직을 실행하지 않음.
    if (handle === 'move' && (e.target as HTMLElement).tagName === 'TEXTAREA') {
      setIsActive(true);
      return; 
    }

    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    
    setIsActive(true);
    activeHandle.current = handle;
    containerRef.current?.focus();
    
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      rectX: rect.x,
      rectY: rect.y,
      rectW: rect.w,
      rectH: rect.h,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeHandle.current) return;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    const { rectX, rectY, rectW, rectH } = startPos.current;

    let newX = rectX;
    let newY = rectY;
    let newW = rectW;
    let newH = rectH;

    if (activeHandle.current === 'move') {
      newX = rectX + deltaX;
      newY = rectY + deltaY;
    } else {
      const handle = activeHandle.current;
      if (handle.includes('e')) newW = rectW + deltaX;
      if (handle.includes('s')) newH = rectH + deltaY;
      if (handle.includes('w')) { newX = rectX + deltaX; newW = rectW - deltaX; }
      if (handle.includes('n')) { newY = rectY + deltaY; newH = rectH - deltaY; }
    }

    // 최소 크기 제한.
    if (newW < 50) { newW = 50; newX = rect.x; }
    if (newH < 30) { newH = 30; newY = rect.y; }

    setRect({ x: newX, y: newY, w: newW, h: newH });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    activeHandle.current = null;
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // 내부 textarea 클릭이나 드래그 중일 때는 포커스 잃지 않도록 예외 처리.
    if (activeHandle.current || e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    setIsActive(false);
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isActive ? styles.active : ''}`}
      style={{
        left: `${rect.x}px`,
        top: `${rect.y}px`,
        width: `${rect.w}px`,
        height: `${rect.h}px`,
      }}
      tabIndex={-1}
      onBlur={handleBlur}
    >
      <div
        className={styles.dragBody}
        onPointerDown={(e) => handlePointerDown(e, 'move')}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {children}
      </div>

      {['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].map((dir) => (
        <div
          key={dir}
          className={`${styles.handle} ${styles[dir]}`}
          onPointerDown={(e) => handlePointerDown(e, dir as HandleType)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
      ))}
    </div>
  );
}