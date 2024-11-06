import './index.css'
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { TodoContextProvider } from './context/TodoContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>
);
