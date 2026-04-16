import { type Slide, useSlideStore } from '../../store/slide-store';

interface Props {
  slide: Slide;
}

// 캔버스와 사이드바 썸네일에서 공통으로 사용할 슬라이드 알맹이
export default function SlideContent({ slide }: Props) {
  const { updateSlideText } = useSlideStore();

  return (
    <textarea
      value={slide.text}
      onChange={(e) => updateSlideText(slide.id, e.target.value)}
      style={{
        width: '80%',
        height: '100px',
        margin: '40px auto',
        display: 'block',
        fontSize: '24px',
        textAlign: 'center',
        border: '1px dashed #ccc',
        background: 'transparent',
        resize: 'none',
      }}
      placeholder="텍스트를 입력하세요"
    />
  );
}