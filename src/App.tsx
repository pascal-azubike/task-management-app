import { ConfigProvider } from 'antd';
import theme from './theme/themeConfig';
import './App.css';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#00ffff]">
            Task Management
          </h1>
          {/* Your components will go here */}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App; 