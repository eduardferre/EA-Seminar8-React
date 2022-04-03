import React from 'react'; // -> Biblioteca que nos permite crear las interfaces web
import ReactDOM from 'react-dom'; // -> Biblioteca react enfocada al navegador

import './index.css'; // -> Aqui podeis modificar los estilos que afecten de forma general a la aplicacion

import App from './App'; //
import reportWebVitals from './reportWebVitals'; // Permite seguir funcionando la app cuando no tenga connexion a internet

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); // Permite renderizar la applicacion en pantalla -> root se encuentra en public/index.html

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
