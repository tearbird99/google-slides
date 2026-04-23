import { useEffect } from 'react';
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
      }, 50); // 50ms 지연

      return () => clearTimeout(timer); // 메모리 누수 방지용 클린업
  }, [activeSlideId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // 5px 이상 움직여야 드래그로 간주.
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
    const currentIndex = slides.findIndex(s => s.id === activeSlideId);

    // 제어할 키 배열 지정.
    const handledKeys = ['Enter', 'Backspace', 'Delete', 'ArrowUp', 'ArrowDown'];

    // 배열에 포함된 키만 기본 동작 방지.
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