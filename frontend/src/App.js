import React, { useState } from 'react';
import './App.css';
import ReceiptUpload from './components/ReceiptUpload';
import ExpenseDashboard from './components/ExpenseDashboard';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = (result) => {
    // Refresh the expense dashboard
    setRefreshTrigger(prev => prev + 1);
    alert('Receipt processed successfully!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Expensifyr</h1>
        <p>Cloud-based Expense Analyzer</p>
      </header>

      <main className="App-main">
        <ReceiptUpload onUploadSuccess={handleUploadSuccess} />
        <ExpenseDashboard refreshTrigger={refreshTrigger} />
      </main>

      <footer className="App-footer">
        <p>&copy; 2024 Expensifyr. Powered by Google Cloud.</p>
      </footer>
    </div>
  );
}

export default App;