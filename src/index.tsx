import './index.css';
import App from './App';
import { changeLanguage, LANG_IDENTIFYER } from './assets/langs/lang';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';

export const BASE_URL = process.env.REACT_APP_API_URL!;
export const API_KEY = process.env.REACT_APP_API_KEY!;
export const API_TOKEN = process.env.REACT_APP_API_TOKEN!;

export const getLang = () => {
  const current = window?.navigator.language;
  changeLanguage(LANG_IDENTIFYER[current])
  return localStorage.getItem('lang') || current;
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
reportWebVitals();