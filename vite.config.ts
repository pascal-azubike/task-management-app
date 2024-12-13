import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React and React-related libraries
          if (id.includes('/node_modules/react')) {
            return 'react'; // Separate React and React DOM
          }
          if (id.includes('/node_modules/react-dom')) {
            return 'react-dom'; // Separate React DOM
          }

          // Ant Design and related libraries
          if (id.includes('/node_modules/antd')) {
            return 'antd'; // Separate Ant Design
          }
          if (id.includes('/node_modules/@ant-design/icons')) {
            return 'antd-icons'; // Separate Ant Design Icons
          }

          // Other common libraries
          if (id.includes('/node_modules/axios')) {
            return 'axios'; // Separate Axios
          }
          if (id.includes('/node_modules/dayjs')) {
            return 'dayjs'; // Separate DayJS
          }

          // Vendor libraries (generic for other libraries in node_modules)
          if (id.includes('/node_modules/')) {
            return 'vendor'; // Other vendor libraries
          }

          // Your custom source code
          if (id.includes('/src/components/')) {
            return 'components'; // Components folder
          }
          if (id.includes('/src/utils/')) {
            return 'utils'; // Utils folder
          }

          // Additional custom folders can go here
        },
      },
    },
  },
});
