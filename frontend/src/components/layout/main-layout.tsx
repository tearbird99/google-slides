import React from 'react';
import styles from './main-layout.module.css';
import Sidebar from '../sidebar/sidebar';
import Header from './header';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className={styles.container}>
      {/* 분리한 헤더 컴포넌트 적용. */}
      <Header />

      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}