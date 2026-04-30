import React, { useState, useRef } from 'react';
import styles from './text-box.module.css';

type HandleType = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'move' | null;

interface Props {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  onChange?: (rect: { x: number; y: number; w: number; h: number }) => void;
  isThumbnail?: boolean;
  children?: React.ReactNode;
}

export default function TextBox({
  x, y, w, h,
  onChange,
  isThumbnail = false,
  children,
}: Props) {
  const safeX = x ?? 100;
  const safeY = y ?? 100;
  const safeW = w ?? 500;
  const safeH = h ?? 150;

  const [rect, setRect] = useState({ x: safeX, y: safeY, w: safeW, h: safeH });
  const [isActive, setIsActive] = useState(false);
  const activeHandle = useRef<HandleType>(null);
  const hasDragged = useRef(false);
  const startPos = useRef({ x: 0, y: 0, rectX: 0, rectY: 0, rectW: 0, rectH: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  if (isThumbnail) {
    return (
      <div
        style={{
          position: 'absolute',
          left: `${rect.x}px`,
          top: `${rect.y}px`,
          width: `${rect.w}px`,
          height: `${rect.h}px`,
          pointerEvents: 'none',
        }}
      >
        {children}
      </div>
    );
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, handle: HandleType) => {
    if (handle === 'move' && (e.target as HTMLElement).tagName === 'TEXTAREA') {
      setIsActive(true);
      return; 
    }
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsActive(true);
    activeHandle.current = handle;
    hasDragged.current = false;
    containerRef.current?.focus();
    startPos.current = { x: e.clientX, y: e.clientY, rectX: rect.x, rectY: rect.y, rectW: rect.w, rectH: rect.h };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeHandle.current) return;
    hasDragged.current = true;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    const { rectX, rectY, rectW, rectH } = startPos.current;

    let newX = rectX, newY = rectY, newW = rectW, newH = rectH;

    if (activeHandle.current === 'move') {
      newX = rectX + deltaX; newY = rectY + deltaY;
    } else {
      const handle = activeHandle.current;
      if (handle.includes('e')) newW = rectW + deltaX;
      if (handle.includes('s')) newH = rectH + deltaY;
      if (handle.includes('w')) { newX = rectX + deltaX; newW = rectW - deltaX; }
      if (handle.includes('n')) { newY = rectY + deltaY; newH = rectH - deltaY; }
    }

    if (newW < 50) { newW = 50; newX = startPos.current.rectX + startPos.current.rectW - 50; }
    if (newH < 30) { newH = 30; newY = startPos.current.rectY + startPos.current.rectH - 30; }

    // 드래그 중에는 로컬 상태만 업데이트
    setRect({ x: newX, y: newY, w: newW, h: newH });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    activeHandle.current = null;
    // pointerup 시점에만 스토어 동기화
    if (hasDragged.current) onChange?.(rect);
    hasDragged.current = false;
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
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
      <div className={styles.dragBody} onPointerDown={(e) => handlePointerDown(e, 'move')} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
        {children}
      </div>
      {['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].map((dir) => (
        <div key={dir} className={`${styles.handle} ${styles[dir]}`} onPointerDown={(e) => handlePointerDown(e, dir as HandleType)} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} />
      ))}
    </div>
  );
}