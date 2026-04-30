import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type Slide } from '../../store/slide-store';
import SlideContent from '../canvas/slide-content';
import styles from './sidebar.module.css';

interface Props {
  slide: Slide;
  index: number;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export default function SortableSlideItem({ slide, index, isActive, onSelect }: Props) {
  // useSortable: dnd-kit이 드래그 순서 변경에 필요한 ref·속성·이벤트 리스너를 제공
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slide.id });

  const style = {
    // CSS.Translate: transform을 translate만 적용해 레이아웃 흐름을 유지
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 'auto',
    touchAction: 'none', // 드래그 중 브라우저 스크롤 방지
  };

  return (
    <div
      id={`slide-thumb-${slide.id}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={() => onSelect(slide.id)}
    >
      <span className={styles.num}>{index + 1}</span>
      {/* thumbWrapper: 144×81px 클리핑 영역 (960×540의 15% 크기) */}
      <div className={`${styles.thumbWrapper} ${isActive ? styles.active : ''}`}>
        {/* thumbScaler: 960×540 실제 크기로 렌더링 후 transform: scale(0.15)로 축소
            CSS transform 방식이므로 새 객체(도형·이미지 등) 추가 시 별도 썸네일 코드 불필요 */}
        <div className={styles.thumbScaler}>
          <SlideContent slide={slide} isThumbnail={true} />
        </div>
      </div>
    </div>
  );
}
