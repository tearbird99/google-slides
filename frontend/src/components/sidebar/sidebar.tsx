import styles from './sidebar.module.css';
import { useSlideStore } from '../../store/slide-store';
import SlideContent from '../canvas/slide-content';

export default function Sidebar() {
  const { slides, activeSlideId, setActiveSlide, addSlide, deleteSlide } = useSlideStore();

  // 키보드 입력 감지 및 액션 실행.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSlide();
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      deleteSlide();
    }
  };

  return (
    <aside 
      className={styles.sidebar}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`${styles.item} ${activeSlideId === slide.id ? styles.active : ''}`}
          onClick={() => setActiveSlide(slide.id)}
        >
          <span className={styles.num}>{index + 1}</span>
          
          <div className={`${styles.thumbWrapper} ${activeSlideId === slide.id ? styles.active : ''}`}>
            <div className={styles.thumbScaler}>
              <SlideContent slide={slide} />
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
}