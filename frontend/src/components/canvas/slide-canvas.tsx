import styles from './slide-canvas.module.css';
import { useSlideStore } from '../../store/slide-store';
import SlideContent from './slide-content'; // 방금 만든 컴포넌트 불러오기

export default function SlideCanvas() {
  const { slides, activeSlideId } = useSlideStore();
  const activeSlide = slides.find(s => s.id === activeSlideId);

  if (!activeSlide) return <div className={styles.wrapper}>슬라이드가 없습니다.</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.slide}>
        {/* 공통 슬라이드 부분 렌더링 */}
        <SlideContent slide={activeSlide} />
      </div>
    </div>
  );
}