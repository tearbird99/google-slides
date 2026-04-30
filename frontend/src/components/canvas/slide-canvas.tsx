import styles from './slide-canvas.module.css';
import SlideContent from './slide-content';
import { useSlideStore } from '../../store/slide-store';

export default function SlideCanvas() {
  const { slides, activeSlideId } = useSlideStore();
  const activeSlide = slides.find((s) => s.id === activeSlideId);

  return (
    // container: 회색 배경 영역 (슬라이드 보드를 중앙에 배치)
    <div className={styles.container}>
      {activeSlide ? (
        // board: 960×540 흰색 편집 영역, position: relative로 TextBox 절대 좌표의 기준점
        <div className={styles.board}>
          <SlideContent slide={activeSlide} />
        </div>
      ) : (
        <div>슬라이드를 선택해주세요</div>
      )}
    </div>
  );
}
