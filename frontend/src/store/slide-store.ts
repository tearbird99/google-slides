import { create } from 'zustand';

export interface Slide {
  id: string;
  text: string; // 테스트용 텍스트
}

interface SlideStore {
  slides: Slide[];
  activeSlideId: string | null;
  addSlide: () => void;
  setActiveSlide: (id: string) => void;
  updateSlideText: (id: string, text: string) => void; // 텍스트 수정 액션
}

// 초기 고유 ID 생성
const initialId = crypto.randomUUID();

export const useSlideStore = create<SlideStore>((set) => ({
  slides: [{ id: initialId, text: '제목을 추가하려면 클릭하세요' }], 
  activeSlideId: initialId, // 초기 슬라이드 자동 선택

  addSlide: () => set((state) => {
    const newSlide = { id: crypto.randomUUID(), text: '' };
    return {
      slides: [...state.slides, newSlide],
      activeSlideId: newSlide.id, // 생성 후 바로 포커스
    };
  }),

  setActiveSlide: (id) => set({ activeSlideId: id }),

  // 특정 슬라이드의 텍스트만 업데이트
  updateSlideText: (id, text) => set((state) => ({
    slides: state.slides.map((slide) => 
      slide.id === id ? { ...slide, text } : slide
    )
  })),
}));