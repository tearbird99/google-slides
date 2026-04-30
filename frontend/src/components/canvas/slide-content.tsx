import React from 'react';
import { type Slide } from '../../store/slide-store';
import { useSlideStore } from '../../store/slide-store';
import TextBox from './text-box';

interface Props {
  slide: Slide;
  // true면 읽기 전용 썸네일로 렌더링 (textarea 대신 div, 드래그 비활성화)
  isThumbnail?: boolean;
}

export default function SlideContent({ slide, isThumbnail = false }: Props) {
  const { updateSlideText, updateSlideRect } = useSlideStore();

  // textarea와 썸네일 div에 공통으로 적용되는 텍스트 스타일
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
    // key={slide.id}: 슬라이드 전환 시 TextBox를 재마운트해 내부 rect 상태를 초기화
    // 재마운트 없이 props만 변경하면 useState 초깃값이 유지돼 이전 슬라이드 위치가 남음
    <TextBox
      key={slide.id}
      x={slide.x}
      y={slide.y}
      w={slide.w}
      h={slide.h}
      onChange={(rect) => updateSlideRect(slide.id, rect)}
      isThumbnail={isThumbnail}
    >
      {isThumbnail ? (
        // 썸네일: 편집 불가, flex로 수직 중앙 정렬
        <div style={{ ...textStyle, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {slide.text || '제목을 추가하려면 클릭하세요'}
        </div>
      ) : (
        // 캔버스: 실제 편집 가능한 textarea
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
