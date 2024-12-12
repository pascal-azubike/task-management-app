import { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    // Color configurations
    colorPrimary: '#60a5fa', // Blue 400
    colorSuccess: '#60a5fa',
    colorWarning: '#faad14',
    colorError: '#ef4444',
    colorInfo: '#60a5fa',
    
    // Border radius
    borderRadius: 8,
    
    // Font configurations
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    fontSize: 16,
    
    // Component specific
    controlHeight: 40,
    
    // Background colors
    colorBgContainer: '#18181b', // Zinc 900
    colorBgElevated: '#27272a', // Zinc 800
    
    // Border colors
    colorBorder: '#3f3f46', // Zinc 700
    
    // Text colors
    colorText: '#fafafa', // Zinc 50
    colorTextSecondary: '#a1a1aa', // Zinc 400
    
    // Animation
    motionDurationMid: '0.2s',
    motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  },
  components: {
    Button: {
      borderRadius: 8,
      controlHeight: 40,
      paddingContentHorizontal: 24,
      boxShadow: '0 2px 8px rgba(96, 165, 250, 0.2)',
      colorPrimaryBg: '#18181b',
    },
    Input: {
      borderRadius: 8,
      controlHeight: 40,
      colorBgContainer: '#27272a',
      colorBorder: '#3f3f46',
    },
    Select: {
      borderRadius: 8,
      controlHeight: 40,
      colorBgContainer: '#27272a',
      colorBorder: '#3f3f46',
    },
    DatePicker: {
      borderRadius: 8,
      controlHeight: 40,
      colorBgContainer: '#27272a',
      colorBorder: '#3f3f46',
    },
    Table: {
      borderRadius: 12,
      fontSize: 14,
      colorBgContainer: '#27272a',
      colorBorder: '#3f3f46',
    },
    Card: {
      borderRadius: 16,
      colorBgContainer: '#27272a',
      colorBorder: '#3f3f46',
    },
    Modal: {
      borderRadius: 16,
      colorBgContainer: '#27272a',
      colorBorder: '#3f3f46',
    },
  },
};

export default theme; 