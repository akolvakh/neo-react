import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // optional, you can skip this if you don't have global styles
import App from './App';

// Render the App component into the root element in public/index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
