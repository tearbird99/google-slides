import { useState, useRef, useEffect } from 'react';
import styles from './header.module.css';
import { 
  fileMenuData, 
  editMenuData, 
  viewMenuData, 
  insertMenuData, 
  formatMenuData, 
  slideMenuData,
  arrangeMenuData,
  toolsMenuData,
  helpMenuData,
  type MenuItem 
} from '../../constants/menu-data';

const topMenus: { id: string; label: string; items: MenuItem[] }[] = [
  { id: 'file', label: '파일', items: fileMenuData },
  { id: 'edit', label: '수정', items: editMenuData },
  { id: 'view', label: '보기', items: viewMenuData },
  { id: 'insert', label: '삽입', items: insertMenuData },
  { id: 'format', label: '서식', items: formatMenuData },
  { id: 'slide', label: '슬라이드', items: slideMenuData },
  { id: 'arrange', label: '정렬', items: arrangeMenuData },
  { id: 'tools', label: '도구', items: toolsMenuData },
  { id: 'help', label: '도움말', items: helpMenuData },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = (menuId: string) => {
    setActiveMenu((prev) => (prev === menuId ? null : menuId));
  };

  return (
    <header className={styles.header}>
      {/* 상단 타이틀 및 메뉴바 영역. */}
      <div className={styles.topRow}>
        <div className={styles.leftSection}>
          <div className={styles.logo}></div>
          <div className={styles.titleArea}>
            <div className={styles.title}>프레젠테이션</div>
            
            <div className={styles.menuBar} ref={menuRef}>
              {topMenus.map((menu) => (
                <div key={menu.id} className={styles.menuItemWrapper}>
                  <span
                    className={`${styles.menuItem} ${activeMenu === menu.id ? styles.active : ''}`}
                    onClick={() => toggleMenu(menu.id)}
                  >
                    {menu.label}
                  </span>
                  
                  {activeMenu === menu.id && menu.items.length > 0 && (
                    <div className={styles.dropdown}>
                      {menu.items.map((item, index) => {
                        if (item.isDivider) {
                          return <div key={`${menu.id}-div-${index}`} className={styles.menuDivider}></div>;
                        }
                        
                        return (
                          <div 
                            key={item.id} 
                            className={`${styles.dropdownItem} ${item.disabled ? styles.disabled : ''}`}
                          >
                            <div className={styles.itemLeft}>
                              {/* 체크 아이콘 렌더링. */}
                              <span className={styles.checkIcon}>
                                {item.isChecked ? '✓' : ''}
                              </span>
                              <span>{item.label}</span>
                            </div>
                            <div className={styles.itemRight}>
                              {item.badge && <span className={styles.badge}>{item.badge}</span>}
                              {item.shortcut && <span>{item.shortcut}</span>}
                              {item.hasSubmenu && <span>▶</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <span className={styles.toolItem}>슬라이드쇼</span>
          <span className={styles.toolItem}>공유</span>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.toolGroup}>
          <span className={styles.toolItem}>검색</span>
          <span className={styles.toolItem}>+ 새 슬라이드</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.toolGroup}>
          <span className={styles.toolItem}>실행 취소</span>
          <span className={styles.toolItem}>재실행</span>
          <span className={styles.toolItem}>인쇄</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.toolGroup}>
          <span className={styles.toolItem}>돋보기</span>
          <span className={styles.toolItem}>선택</span>
          <span className={styles.toolItem}>텍스트 상자</span>
          <span className={styles.toolItem}>이미지</span>
          <span className={styles.toolItem}>도형</span>
          <span className={styles.toolItem}>선</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.toolGroup}>
          <span className={styles.toolItem}>배경</span>
          <span className={styles.toolItem}>레이아웃</span>
          <span className={styles.toolItem}>테마</span>
          <span className={styles.toolItem}>전환</span>
        </div>
      </div>
    </header>
  );
}