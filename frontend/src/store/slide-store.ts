import { create } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';

export interface Slide {
  id: string;
  text: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

interface SlideStore {
  slides: Slide[];
  activeSlideId: string | null;
  addSlide: () => void;
  deleteSlide: () => void;
  setActiveSlide: (id: string) => void;
  updateSlideText: (id: string, text: string) => void;
  updateSlideRect: (id: string, rect: { x: number; y: number; w: number; h: number }) => void;
  reorderSlides: (activeId: string, overId: string) => void;
}

const initialId = crypto.randomUUID();

export const useSlideStore = create<SlideStore>((set) => ({
  // 첫 슬라이드 생성 시 기본 좌표와 크기를 부여함.
  slides: [{ 
    id: initialId, 
    text: '제목을 추가하려면 클릭하세요',
    x: 100,
    y: 100,
    w: 500,
    h: 150
  }], 
  activeSlideId: initialId,

  // 현재 활성화된 슬라이드 바로 뒤에 추가함.
  addSlide: () => set((state) => {
    // 새 슬라이드 생성 시 기본 좌표와 크기를 무조건 부여함.
    const newSlide = { 
      id: crypto.randomUUID(), 
      text: '',
      x: 100,
      y: 100,
      w: 500,
      h: 150
    };
    const activeIndex = state.slides.findIndex(s => s.id === state.activeSlideId);
    
    const newSlides = [...state.slides];
    if (activeIndex >= 0) {
      newSlides.splice(activeIndex + 1, 0, newSlide);
    } else {
      newSlides.push(newSlide);
    }

    return {
      slides: newSlides,
      activeSlideId: newSlide.id,
    };
  }),

  // 활성화된 슬라이드 삭제 및 포커스 이동.
  deleteSlide: () => set((state) => {
    if (state.slides.length <= 1) return state;

    const activeIndex = state.slides.findIndex(s => s.id === state.activeSlideId);
    if (activeIndex === -1) return state;

    const newSlides = state.slides.filter(s => s.id !== state.activeSlideId);
    const nextActiveId = activeIndex > 0 ? state.slides[activeIndex - 1].id : newSlides[0].id;

    return {
      slides: newSlides,
      activeSlideId: nextActiveId,
    };
  }),

  setActiveSlide: (id) => set({ activeSlideId: id }),

  updateSlideText: (id, text) => set((state) => ({
    slides: state.slides.map((slide) => 
      slide.id === id ? { ...slide, text } : slide
    )
  })),

  updateSlideRect: (id, rect) =>
    set((state) => ({
      slides: state.slides.map((slide) =>
        slide.id === id ? { ...slide, ...rect } : slide
      ),
    })),

  // 슬라이드 순서를 변경.
  reorderSlides: (activeId, overId) => set((state) => {
    const oldIndex = state.slides.findIndex((s) => s.id === activeId);
    const newIndex = state.slides.findIndex((s) => s.id === overId);
    return {
      slides: arrayMove(state.slides, oldIndex, newIndex),
    };
  }),
}));