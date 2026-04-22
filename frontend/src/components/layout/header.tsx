import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      {/* 상단 타이틀 및 메뉴바 영역. */}
      <div className={styles.topRow}>
        <div className={styles.leftSection}>
          <div className={styles.logo}></div>
          <div className={styles.titleArea}>
            <div className={styles.title}>프레젠테이션</div>
            <div className={styles.menuBar}>
              <span className={styles.menuItem}>파일</span>
              <span className={styles.menuItem}>수정</span>
              <span className={styles.menuItem}>보기</span>
              <span className={styles.menuItem}>삽입</span>
              <span className={styles.menuItem}>서식</span>
              <span className={styles.menuItem}>슬라이드</span>
              <span className={styles.menuItem}>정렬</span>
              <span className={styles.menuItem}>도구</span>
              <span className={styles.menuItem}>도움말</span>
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <span className={styles.toolItem}>슬라이드쇼</span>
          <span className={styles.toolItem}>공유</span>
        </div>
      </div>

      {/* 하단 도구 모음 영역. */}
      <div className={styles.toolbar}>
        <div className={styles.toolGroup}>
          <span className={styles.toolItem}>검색</span>
          <span className={styles.toolItem}>+ 새 슬라이드</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.toolGroup}>
          <span className={styles.toolItem}>실행 취소</span>
          <span className={styles.toolItem}>재실행</span>
          <span className={styles.toolItem}>인쇄</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.toolGroup}>
          <span className={styles.toolItem}>돋보기</span>
          <span className={styles.toolItem}>선택</span>
          <span className={styles.toolItem}>텍스트 상자</span>
          <span className={styles.toolItem}>이미지</span>
          <span className={styles.toolItem}>도형</span>
          <span className={styles.toolItem}>선</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.toolGroup}>
          <span className={styles.toolItem}>배경</span>
          <span className={styles.toolItem}>레이아웃</span>
          <span className={styles.toolItem}>테마</span>
          <span className={styles.toolItem}>전환</span>
        </div>
      </div>
    </header>
  );
}