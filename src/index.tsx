import './index.css';
import App from './App';
import { changeLanguage, LANG_IDENTIFYER, LangSupportType } from './assets/langs/lang';
import { LoaderService } from './core/services/loader';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { NavigateFunction } from 'react-router-dom';
import { BehaviorSubject } from 'rxjs';

export const BASE_URL = process.env.REACT_APP_API_URL!;
export const API_KEY = process.env.REACT_APP_API_KEY!;
export const API_TOKEN = process.env.REACT_APP_API_TOKEN!;
export const CRYPT_KEY = process.env.REACT_APP_CRYPT_KEY;
export const loaderService = new LoaderService();
export const routerEvents = new BehaviorSubject<string>('');
export class Router {
  public static fn: NavigateFunction;
  public static navigate(path: string): void {
    Router.fn(path)
  }
}

export const getLang = () => {
  const current = window?.navigator.language;
  const lang = localStorage.getItem('lang') || current;
  changeLanguage(LANG_IDENTIFYER[lang]);
  return lang as LangSupportType;
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <App />
);
export const onDocumentClick = (next: (event: MouseEvent) => void) => {
  if (document.getElementById('root')) {
    (document.getElementById('root')!.onclick = (event) => next && next(event))
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
reportWebVitals();