import styles from './slide-canvas.module.css';
import SlideContent from './slide-content';
import { useSlideStore } from '../../store/slide-store';

export default function SlideCanvas() {
  const { slides, activeSlideId } = useSlideStore();
  const activeSlide = slides.find((s) => s.id === activeSlideId);

  return (
    <div className={styles.container}>
      {activeSlide ? (
        <div className={styles.board}>
          <SlideContent slide={activeSlide} />
        </div>
      ) : (
        <div>슬라이드를 선택해주세요</div>
      )}
    </div>
  );
}