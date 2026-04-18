import { create } from 'zustand';

export interface Slide {
  id: string;
  text: string;
}

interface SlideStore {
  slides: Slide[];
  activeSlideId: string | null;
  addSlide: () => void;
  deleteSlide: () => void;
  setActiveSlide: (id: string) => void;
  updateSlideText: (id: string, text: string) => void;
}

const initialId = crypto.randomUUID();

export const useSlideStore = create<SlideStore>((set) => ({
  slides: [{ id: initialId, text: '제목을 추가하려면 클릭하세요' }], 
  activeSlideId: initialId,

  // 현재 활성화된 슬라이드 바로 뒤에 추가.
  addSlide: () => set((state) => {
    const newSlide = { id: crypto.randomUUID(), text: '' };
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
}));