import React from 'react';
import { type Slide } from '../../store/slide-store';
import { useSlideStore } from '../../store/slide-store';
import TextBox from './text-box';

interface Props {
  slide: Slide;
  isThumbnail?: boolean;
}

export default function SlideContent({ slide, isThumbnail = false }: Props) {
  const { updateSlideText, updateSlideRect } = useSlideStore();

  const textStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    fontSize: '24px',
    textAlign: 'center',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
  };

  return (
    <TextBox
      x={slide.x}
      y={slide.y}
      w={slide.w}
      h={slide.h}
      onChange={(rect) => updateSlideRect(slide.id, rect)}
      isThumbnail={isThumbnail}
    >
      {isThumbnail ? (
        <div style={{ ...textStyle, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {slide.text || '제목을 추가하려면 클릭하세요'}
        </div>
      ) : (
        <textarea
          value={slide.text}
          onChange={(e) => updateSlideText(slide.id, e.target.value)}
          style={{
            ...textStyle,
            background: 'transparent',
            border: 'none',
            resize: 'none',
            outline: 'none',
          }}
          placeholder="제목을 추가하려면 클릭하세요"
        />
      )}
    </TextBox>
  );
}