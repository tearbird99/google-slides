import styles from './sidebar.module.css';
import { useSlideStore } from '../../store/slide-store';
import SlideContent from '../canvas/slide-content'; // 추가

export default function Sidebar() {
  const { slides, activeSlideId, addSlide, setActiveSlide } = useSlideStore();

  return (
    <aside className={styles.sidebar}>
      <button className={styles.addBtn} onClick={addSlide}>
        + 새 슬라이드
      </button>
      
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`${styles.item} ${activeSlideId === slide.id ? styles.active : ''}`}
          onClick={() => setActiveSlide(slide.id)}
        >
          <span className={styles.num}>{index + 1}</span>
          
          {/* 축소된 슬라이드가 들어갈 썸네일 영역 */}
          <div className={`${styles.thumbWrapper} ${activeSlideId === slide.id ? styles.active : ''}`}>
            <div className={styles.thumbScaler}>
              {/* 메인 캔버스와 완전히 똑같은 슬라이드를 렌더링*/}
              <SlideContent slide={slide} />
            </div>
          </div>

        </div>
      ))}
    </aside>
  );
}