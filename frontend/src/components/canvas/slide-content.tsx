import { type Slide } from '../../store/slide-store';
import { useSlideStore } from '../../store/slide-store';

interface Props {
  slide: Slide;
}

// 캔버스와 사이드바 썸네일에서 공통으로 사용할 슬라이드 파트
export default function SlideContent({ slide }: Props) {
  const { updateSlideText } = useSlideStore();

  return (
    <textarea
      value={slide.text}
      onChange={(e) => updateSlideText(slide.id, e.target.value)}
      style={{
        position: 'absolute',
        top: '40px',
        left: '10%',
        width: '80%',
        height: '100px',
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