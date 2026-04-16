import React from 'react';
import styles from './main-layout.module.css';
import Sidebar from '../sidebar/sidebar'; // 추가

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>메뉴 및 툴바</div>
      </header>

      <div className={styles.body}>
        {/* 분리한 사이드바 컴포넌트 적용 */}
        <Sidebar />

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}