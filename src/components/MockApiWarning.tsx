import { WarningFilled } from '@ant-design/icons';

const MockApiWarning = () => {
  return (
    <div className="mock-api-warning">
      <WarningFilled />
      <span className="mock-api-warning-text">
        Note: This app uses a mock API for demonstration purposes. All data is stored in memory and will be lost when you refresh the browser.
      </span>
    </div>
  );
};

export default MockApiWarning; 