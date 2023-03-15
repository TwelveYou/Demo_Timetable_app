import React from 'react';
import ReactDOM from 'react-dom';


import App from './App';
// import reportWebVitals from './reportWebVitals';

// let name_board = String(window.location);
// name_board = name_board.substring(name_board.lastIndexOf('/')+1,name_board.length);
// console.log(name_board);



ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);