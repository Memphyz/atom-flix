import ReactDOM from 'react-dom/client';
import { NavigateFunction } from 'react-router-dom';
import { App } from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BehaviorSubject } from "rxjs";
import { isMobileBrowser } from "./shared/utils/regex";
import './i18n'

export const BASE_URL = process.env.REACT_APP_API_URL!;
export const API_KEY = process.env.REACT_APP_API_KEY!;
export const API_TOKEN = process.env.REACT_APP_API_TOKEN!;
export const CRYPT_KEY = process.env.REACT_APP_CRYPT_KEY!;

export const loaderService = new BehaviorSubject<boolean>(false);

export class Router {
  public static fn: NavigateFunction;
  public static navigate(path: string): void {
    Router.fn(path);
  }
}


export const isMobile = window.innerWidth <= 992;
function checkBrowser(): void {
  if (!isMobileBrowser()) {
    document.querySelector("html")!.classList.add("desktop");
  }
}

window.onresize = checkBrowser;

checkBrowser();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
