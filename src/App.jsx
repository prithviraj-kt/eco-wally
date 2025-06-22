import React from 'react';
import { AppProvider } from './context/AppContext';
import MainApp from './components/MainApp';
import './index.css';

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;