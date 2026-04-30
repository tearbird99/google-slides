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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slide.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 'auto',
    touchAction: 'none', // 드래그 중 스크롤 방지
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
      <div className={`${styles.thumbWrapper} ${isActive ? styles.active : ''}`}>
        <div className={styles.thumbScaler}>
          <SlideContent slide={slide} isThumbnail={true} />
        </div>
      </div>
    </div>
  );
}