import { useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import styles from './sidebar.module.css';
import { useSlideStore } from '../../store/slide-store';
import SortableSlideItem from './sortable-slide-item';

export default function Sidebar() {
  const { slides, activeSlideId, setActiveSlide, addSlide, deleteSlide, reorderSlides } = useSlideStore();

  useEffect(() => {
    const timer = setTimeout(() => {
        const activeElement = document.getElementById(`slide-thumb-${activeSlideId}`);
        if (activeElement) {
          activeElement.scrollIntoView({
            behavior: 'smooth', 
            block: 'nearest',   
          });
        }
      }, 50); // 렌더 완료 후 스크롤 실행

      return () => clearTimeout(timer);
  }, [activeSlideId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // 5px 미만은 클릭으로 처리
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = slides.findIndex(s => s.id === activeSlideId);

    const handledKeys = ['Enter', 'Backspace', 'Delete', 'ArrowUp', 'ArrowDown'];

    if (handledKeys.includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case 'Enter':
        addSlide();
        break;
      case 'Backspace':
      case 'Delete':
        deleteSlide();
        break;
      case 'ArrowUp':
        if (currentIndex > 0) setActiveSlide(slides[currentIndex - 1].id);
        break;
      case 'ArrowDown':
        if (currentIndex < slides.length - 1) setActiveSlide(slides[currentIndex + 1].id);
        break;
    }
  };

  return (
    <aside className={styles.sidebar} tabIndex={0} onKeyDown={handleKeyDown}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
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