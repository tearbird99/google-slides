export interface MenuItem {
  id: string;
  label: string;
  shortcut?: string;
  hasSubmenu?: boolean;
  isDivider?: boolean;
  badge?: string;
  disabled?: boolean;
  isChecked?: boolean;
}

// 파일 메뉴 데이터.
export const fileMenuData: MenuItem[] = [
  { id: 'new', label: '새 문서', hasSubmenu: true },
  { id: 'open', label: '열기', shortcut: 'Ctrl+O' },
  { id: 'import', label: '슬라이드 가져오기' },
  { id: 'copy', label: '사본 만들기', hasSubmenu: true },
  { id: 'div1', label: '', isDivider: true },
  { id: 'share', label: '공유', hasSubmenu: true },
  { id: 'email', label: '이메일', hasSubmenu: true },
  { id: 'download', label: '다운로드', hasSubmenu: true },
  { id: 'convert', label: '동영상으로 변환', badge: '신규' },
  { id: 'div2', label: '', isDivider: true },
  { id: 'rename', label: '이름 바꾸기' },
  { id: 'move', label: '이동' },
  { id: 'shortcut', label: 'Drive에 바로가기 추가' },
  { id: 'trash', label: '휴지통으로 이동' },
  { id: 'div3', label: '', isDivider: true },
  { id: 'history', label: '버전 기록', hasSubmenu: true },
  { id: 'offline', label: '오프라인 사용 설정' },
  { id: 'div4', label: '', isDivider: true },
  { id: 'details', label: '세부정보' },
  { id: 'security', label: '보안 제한사항' },
  { id: 'language', label: '언어', hasSubmenu: true },
  { id: 'div5', label: '', isDivider: true },
  { id: 'page-setup', label: '페이지 설정' },
  { id: 'print-preview', label: '인쇄 미리보기' },
  { id: 'print', label: '인쇄', shortcut: 'Ctrl+P' },
];

// 수정 메뉴 데이터.
export const editMenuData: MenuItem[] = [
  { id: 'undo', label: '실행취소', shortcut: 'Ctrl+Z' },
  { id: 'redo', label: '재실행', shortcut: 'Ctrl+Y' },
  { id: 'div1', label: '', isDivider: true },
  { id: 'cut', label: '잘라내기', shortcut: 'Ctrl+X', disabled: true },
  { id: 'copy', label: '복사', shortcut: 'Ctrl+C', disabled: true },
  { id: 'paste', label: '붙여넣기', shortcut: 'Ctrl+V' },
  { id: 'paste-without-formatting', label: '서식 없이 붙여넣기', shortcut: 'Ctrl+Shift+V' },
  { id: 'div2', label: '', isDivider: true },
  { id: 'select-all', label: '모두 선택', shortcut: 'Ctrl+A' },
  { id: 'delete', label: '삭제', disabled: true },
  { id: 'duplicate', label: '복사', shortcut: 'Ctrl+D', disabled: true },
  { id: 'div3', label: '', isDivider: true },
  { id: 'find-replace', label: '찾기 및 바꾸기', shortcut: 'Ctrl+H' },
];

// 보기 메뉴 데이터.
export const viewMenuData: MenuItem[] = [
  { id: 'mode', label: '모드', hasSubmenu: true },
  { id: 'div1', label: '', isDivider: true },
  { id: 'slideshow', label: '슬라이드쇼', shortcut: 'Ctrl+F5' },
  { id: 'motion', label: '모션', shortcut: 'Ctrl+Alt+Shift+B' },
  { id: 'theme-builder', label: '테마 만들기 도구' },
  { id: 'comments', label: '댓글', hasSubmenu: true },
  { id: 'div2', label: '', isDivider: true },
  { id: 'grid-view', label: '바둑판 보기', shortcut: 'Ctrl+Alt+1' },
  { id: 'show-ruler', label: '눈금자 표시', isChecked: true },
  { id: 'div3', label: '', isDivider: true },
  { id: 'guides', label: '가이드', hasSubmenu: true },
  { id: 'snap-to', label: '맞추기', hasSubmenu: true },
  { id: 'live-pointers', label: '실시간 포인터', hasSubmenu: true },
  { id: 'div4', label: '', isDivider: true },
  { id: 'speaker-notes', label: '발표자 노트 표시', isChecked: true },
  { id: 'filmstrip', label: '슬라이드 보기', isChecked: true },
  { id: 'div5', label: '', isDivider: true },
  { id: 'zoom', label: '확대/축소 메뉴', hasSubmenu: true },
  { id: 'fullscreen', label: '전체 화면' },
];

// 삽입 메뉴 데이터.
export const insertMenuData: MenuItem[] = [
  { id: 'image', label: '이미지', hasSubmenu: true },
  { id: 'text-box', label: '텍스트 상자' },
  { id: 'shape', label: '도형', hasSubmenu: true },
  { id: 'table', label: '표', hasSubmenu: true },
  { id: 'chart', label: '차트', hasSubmenu: true },
  { id: 'line', label: '선', hasSubmenu: true },
  { id: 'word-art', label: 'Word Art' },
  { id: 'div1', label: '', isDivider: true },
  { id: 'video', label: '동영상' },
  { id: 'audio', label: '오디오' },
  { id: 'div2', label: '', isDivider: true },
  { id: 'special-characters', label: '특수문자', disabled: true },
  { id: 'animation', label: '애니메이션', disabled: true },
  { id: 'div3', label: '', isDivider: true },
  { id: 'link', label: '링크', shortcut: 'Ctrl+K', disabled: true },
  { id: 'comment', label: '댓글', shortcut: 'Ctrl+Alt+M' },
  { id: 'div4', label: '', isDivider: true },
  { id: 'new-slide', label: '새 슬라이드', shortcut: 'Ctrl+M' },
  { id: 'create-slide', label: '슬라이드 만들기', hasSubmenu: true },
  { id: 'slide-number', label: '슬라이드 번호' },
];

// 서식 메뉴 데이터.
export const formatMenuData: MenuItem[] = [
  { id: 'text', label: '텍스트', hasSubmenu: true, disabled: true },
  { id: 'align-indent', label: '정렬 및 들여쓰기', hasSubmenu: true, disabled: true },
  { id: 'line-spacing', label: '줄 및 단락 간격', hasSubmenu: true, disabled: true },
  { id: 'bullets-numbering', label: '글머리기호 및 번호 매기기', hasSubmenu: true, disabled: true },
  { id: 'div1', label: '', isDivider: true },
  { id: 'table', label: '표', hasSubmenu: true, disabled: true },
  { id: 'image', label: '이미지', hasSubmenu: true, disabled: true },
  { id: 'borders-lines', label: '테두리 및 선', hasSubmenu: true, disabled: true },
  { id: 'div2', label: '', isDivider: true },
  { id: 'format-options', label: '서식 옵션', disabled: true },
  { id: 'clear-formatting', label: '서식 지우기', shortcut: 'Ctrl+\\', disabled: true },
];

// 슬라이드 메뉴 데이터.
export const slideMenuData: MenuItem[] = [
  { id: 'new-slide', label: '새 슬라이드', shortcut: 'Ctrl+M' },
  { id: 'div1', label: '', isDivider: true },
  { id: 'create-slide', label: '슬라이드 만들기', hasSubmenu: true },
  { id: 'decorate-with-image', label: '이미지로 꾸미기 🍌' },
  { id: 'div2', label: '', isDivider: true },
  { id: 'duplicate-slide', label: '슬라이드 복사' },
  { id: 'delete-slide', label: '슬라이드 삭제' },
  { id: 'skip-slide', label: '슬라이드 건너뛰기' },
  { id: 'move-slide', label: '슬라이드 이동', hasSubmenu: true, disabled: true },
  { id: 'div3', label: '', isDivider: true },
  { id: 'change-background', label: '배경 변경' },
  { id: 'apply-layout', label: '레이아웃 적용', hasSubmenu: true },
  { id: 'transition', label: '전환' },
  { id: 'div4', label: '', isDivider: true },
  { id: 'edit-theme', label: '테마 수정' },
  { id: 'change-theme', label: '테마 변경' },
];

// 정렬 메뉴 데이터.
export const arrangeMenuData: MenuItem[] = [
  { id: 'order', label: '순서', hasSubmenu: true, disabled: true },
  { id: 'align', label: '정렬', hasSubmenu: true, disabled: true },
  { id: 'distribute', label: '배치', hasSubmenu: true, disabled: true },
  { id: 'center-on-page', label: '페이지 중앙에 배치', hasSubmenu: true, disabled: true },
  { id: 'rotate', label: '회전', hasSubmenu: true, disabled: true },
  { id: 'image-arrange', label: '이미지', hasSubmenu: true, disabled: true },
  { id: 'div1', label: '', isDivider: true },
  { id: 'group', label: '그룹화', shortcut: 'Ctrl+Alt+G', disabled: true },
  { id: 'ungroup', label: '그룹해제', shortcut: 'Ctrl+Alt+Shift+G', disabled: true },
];

// 도구 메뉴 데이터.
export const toolsMenuData: MenuItem[] = [
  { id: 'spell-check', label: '맞춤법 검사', hasSubmenu: true },
  { id: 'linked-objects', label: '연결된 객체' },
  { id: 'dictionary', label: '사전', shortcut: 'Ctrl+Shift+Y' },
  { id: 'qa-history', label: 'Q&A 기록' },
  { id: 'div1', label: '', isDivider: true },
  { id: 'voice-type-speaker-notes', label: '발표자 노트 음성기록', shortcut: 'Ctrl+Shift+S' },
  { id: 'notification-settings', label: '알림 설정' },
  { id: 'preferences', label: '환경설정' },
  { id: 'accessibility', label: '접근성' },
  { id: 'div2', label: '', isDivider: true },
  { id: 'workspace-experiments', label: 'Workspace Experiments 참여 거부' },
];

// 도움말 메뉴 데이터.
export const helpMenuData: MenuItem[] = [
  { id: 'search-menu', label: '메뉴 검색', shortcut: 'Alt+/' },
  { id: 'div1', label: '', isDivider: true },
  { id: 'slides-help', label: 'Slides 도움말' },
  { id: 'training', label: '교육' },
  { id: 'updates', label: '업데이트' },
  { id: 'div2', label: '', isDivider: true },
  { id: 'help-improve-slides', label: 'Slides 개선 돕기' },
  { id: 'div3', label: '', isDivider: true },
  { id: 'privacy-policy', label: '개인정보처리방침' },
  { id: 'terms-of-service', label: '서비스 약관' },
  { id: 'div4', label: '', isDivider: true },
  { id: 'keyboard-shortcuts', label: '키보드 단축키', shortcut: 'Ctrl+/' },
];