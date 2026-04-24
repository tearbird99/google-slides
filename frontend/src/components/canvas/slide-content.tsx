import { type Slide } from '../../store/slide-store';
import { useSlideStore } from '../../store/slide-store';
import TextBox from './text-box';

interface Props {
  slide: Slide;
}

// 캔버스와 사이드바 썸네일에서 공통으로 사용할 슬라이드 파트.
export default function SlideContent({ slide }: Props) {
  const { updateSlideText } = useSlideStore();

  return (
    <TextBox
      initialX={100}
      initialY={50}
      initialWidth={500}
      initialHeight={150}
    >
      <textarea
        value={slide.text}
        onChange={(e) => updateSlideText(slide.id, e.target.value)}
        style={{
          width: '100%',
          height: '100%',
          fontSize: '24px',
          textAlign: 'center',
          background: 'transparent',
          border: 'none',
          resize: 'none',
          outline: 'none',
          fontFamily: 'inherit',
          boxSizing: 'border-box',
        }}
        placeholder="제목을 추가하려면 클릭하세요"
      />
    </TextBox>
  );
}