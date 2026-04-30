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

  // 활성 슬라이드 썸네일을 사이드바 뷰포트 안으로 스크롤
  // 50ms 지연: 상태 변경 후 DOM 반영 완료를 기다림
  useEffect(() => {
    const timer = setTimeout(() => {
      const activeElement = document.getElementById(`slide-thumb-${activeSlideId}`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [activeSlideId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // 5px 미만 이동은 클릭으로 처리 (의도치 않은 드래그 방지)
      activationConstraint: { distance: 5 },
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

  // 사이드바 포커스 시 키보드로 슬라이드 조작
  // 브라우저 기본 동작(스크롤 등)을 막아야 하는 키만 preventDefault 처리
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
    // tabIndex={0}: 사이드바가 키보드 포커스를 받을 수 있도록 설정
    <aside className={styles.sidebar} tabIndex={0} onKeyDown={handleKeyDown}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        // 썸네일 드래그를 수직 방향으로만 제한
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
