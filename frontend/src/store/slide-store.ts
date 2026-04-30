import { create } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';

// 슬라이드 한 장의 데이터 구조
// x, y, w, h는 텍스트박스의 960×540 캔버스 기준 절대 좌표
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

// 스토어 초기화 전에 ID를 미리 생성해 slides와 activeSlideId를 동기화
const initialId = crypto.randomUUID();

export const useSlideStore = create<SlideStore>((set) => ({
  slides: [{
    id: initialId,
    text: '제목을 추가하려면 클릭하세요',
    // 텍스트박스 기본 위치 및 크기 (캔버스 960×540 기준)
    x: 100,
    y: 100,
    w: 500,
    h: 150
  }],
  activeSlideId: initialId,

  // 활성 슬라이드 바로 뒤에 삽입
  // 활성 슬라이드가 없으면 맨 뒤에 추가
  addSlide: () => set((state) => {
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

  // 슬라이드가 1장이면 삭제하지 않음
  // 삭제 후 포커스는 이전 슬라이드로, 첫 번째였으면 다음 슬라이드로 이동
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

  // TextBox의 pointerup 시점에만 호출됨 (드래그 중에는 로컬 상태만 변경)
  updateSlideRect: (id, rect) =>
    set((state) => ({
      slides: state.slides.map((slide) =>
        slide.id === id ? { ...slide, ...rect } : slide
      ),
    })),

  // @dnd-kit의 arrayMove로 슬라이드 순서 변경
  reorderSlides: (activeId, overId) => set((state) => {
    const oldIndex = state.slides.findIndex((s) => s.id === activeId);
    const newIndex = state.slides.findIndex((s) => s.id === overId);
    return {
      slides: arrayMove(state.slides, oldIndex, newIndex),
    };
  }),
}));
