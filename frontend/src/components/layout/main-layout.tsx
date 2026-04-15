import React from 'react';
import styles from './main-layout.module.css';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className={styles.container}>
      {/* 상단 헤더 */}
      <header className={styles.header}>
        <div>메뉴 및 툴바</div>
      </header>

      {/* 하단 작업 공간 */}
      <div className={styles.body}>
        {/* 좌측 슬라이드 목록 */}
        <aside className={styles.sidebar}>
          <div>슬라이드 목록</div>
        </aside>

        {/* 중앙 캔버스 */}
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}