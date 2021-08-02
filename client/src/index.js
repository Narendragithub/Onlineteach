import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.headers.common['Authorization'] = 'TOKEN';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use((request) => {
  console.log(request);
  //Edit request configration
  return request;

}, (error) => {
  console.log(error);
  Promise.reject(error);
});

axios.interceptors.response.use((response) => {

  //Edit response configration
  return response;

}, (error) => {
  console.log(error);
  Promise.reject(error);
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
