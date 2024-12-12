import React from 'react';
import { Dropdown, Button, Tooltip } from 'antd';
import { DesktopOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Theme switching component that toggles between light and dark modes.
 * Provides visual feedback for the current theme state.
 */
const ThemeSwitcher: React.FC = () => {
  const { themeMode, setThemeMode, isDarkMode } = useTheme();

  const items = [
    {
      key: 'light',
      label: (
        <span className="text-base">Light</span>
      ),
      icon: <SunOutlined />,
    },
    {
      key: 'dark',
      label: (
        <span className="text-base">Dark</span>
      ),
      icon: <MoonOutlined />,
    },
    {
      key: 'system',
      label: (
        <span className="text-base">System</span>
      ),
      icon: <DesktopOutlined />,
    },
  ];

  // Mobile dropdown version
  const mobileSwitch = (
    <Dropdown
      menu={{
        items,
        selectedKeys: [themeMode],
        onClick: ({ key }) => setThemeMode(key as 'light' | 'dark' | 'system'),
      }}
      trigger={['click']}
      placement="bottomRight"
      overlayClassName="theme-dropdown"
      getPopupContainer={() => document.body}
      dropdownRender={(menu) => (
        <div style={{ zIndex: 1000 }}>
          {menu}
        </div>
      )}
    >
      <Button
        type="text"
        icon={themeMode === 'system' ? <DesktopOutlined /> : isDarkMode ? <MoonOutlined /> : <SunOutlined />}
        className={isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-800'}
      />
    </Dropdown>
  );

  // Desktop buttons version
  const desktopSwitch = (
    <div className="flex gap-1 bg-opacity-20 rounded-lg p-1" style={{ background: 'var(--bg-container)' }}>
      <Tooltip title="Light Mode">
        <Button
          type="text"
          icon={<SunOutlined />}
          onClick={() => setThemeMode('light')}
          className={`${
            themeMode === 'light'
              ? 'bg-blue-500/10 text-blue-500'
              : isDarkMode
              ? 'text-zinc-400 hover:text-zinc-200'
              : 'text-zinc-600 hover:text-zinc-800'
          }`}
        />
      </Tooltip>
      <Tooltip title="Dark Mode">
        <Button
          type="text"
          icon={<MoonOutlined />}
          onClick={() => setThemeMode('dark')}
          className={`${
            themeMode === 'dark'
              ? 'bg-blue-500/10 text-blue-500'
              : isDarkMode
              ? 'text-zinc-400 hover:text-zinc-200'
              : 'text-zinc-600 hover:text-zinc-800'
          }`}
        />
      </Tooltip>
      <Tooltip title="System Mode">
        <Button
          type="text"
          icon={<DesktopOutlined />}
          onClick={() => setThemeMode('system')}
          className={`${
            themeMode === 'system'
              ? 'bg-blue-500/10 text-blue-500'
              : isDarkMode
              ? 'text-zinc-400 hover:text-zinc-200'
              : 'text-zinc-600 hover:text-zinc-800'
          }`}
        />
      </Tooltip>
    </div>
  );

  return (
    <>
      <div className="hidden md:block">{desktopSwitch}</div>
      <div className="block md:hidden">{mobileSwitch}</div>
    </>
  );
};

export default ThemeSwitcher; 