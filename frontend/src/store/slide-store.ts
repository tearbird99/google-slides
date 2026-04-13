import { create } from 'zustand';

// 슬라이드 기본 타입
export interface Slide {
  id: string;
}

// 스토어 상태 및 액션 타입
interface SlideStore {
  slides: Slide[];
  activeSlideId: string | null;
  addSlide: () => void;
  setActiveSlide: (id: string) => void;
}

// 스토어 생성
export const useSlideStore = create<SlideStore>((set) => ({
  slides: [{ id: crypto.randomUUID() }], // 초기 슬라이드 1개
  activeSlideId: null,

  // 새 슬라이드 추가
  addSlide: () => set((state) => {
    const newSlide = { id: crypto.randomUUID() };
    return {
      slides: [...state.slides, newSlide],
      activeSlideId: newSlide.id,
    };
  }),

  // 활성 슬라이드 변경
  setActiveSlide: (id) => set({ activeSlideId: id }),
}));