import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core'; // 타입 임포트 분리
import {
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import styles from './sidebar.module.css';
import { useSlideStore } from '../../store/slide-store';
import SortableSlideItem from './sortable-slide-item';

export default function Sidebar() {
  const { slides, activeSlideId, setActiveSlide, addSlide, deleteSlide, reorderSlides } = useSlideStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // 5px 이상 움직여야 드래그로 간주
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderSlides(active.id as string, over.id as string);
    }
  };

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
    <aside className={styles.sidebar} tabIndex={0} onKeyDown={handleKeyDown}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/* id 문자열 배열을 매핑하여 전달. */}
        <SortableContext items={slides.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {slides.map((slide, index) => (
            <SortableSlideItem
              key={slide.id}
              slide={slide}
              index={index}
              isActive={activeSlideId === slide.id}
              onSelect={setActiveSlide}
            />
          ))}
        </SortableContext>
      </DndContext>
    </aside>
  );
}