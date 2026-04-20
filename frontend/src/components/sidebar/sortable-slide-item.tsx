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
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // 드래그 중인 아이템의 투명도를 조절.
    zIndex: isDragging ? 1 : 'auto',
    touchAction: 'none', // 브라우저 기본 동작을 차단.
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners} // 드래그 핸들 역할을 하도록 리스너를 주입.
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={() => onSelect(slide.id)}
    >
      <span className={styles.num}>{index + 1}</span>
      <div className={`${styles.thumbWrapper} ${isActive ? styles.active : ''}`}>
        <div className={styles.thumbScaler}>
          <SlideContent slide={slide} />
        </div>
      </div>
    </div>
  );
}