import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { loaderService } from '.';
import { icons } from './assets/icons/icons';
import RoutesApp from './routes';
import { Component, ReactNode } from 'react';
import { PropagateLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import { debounceTime } from 'rxjs';

const REQUISITION_DEBOUNCE_TIME = 90;

export default class App extends Component {

  public isLoading = false;

  public componentDidMount(): void {
    loaderService.onChange().pipe(debounceTime(REQUISITION_DEBOUNCE_TIME)).subscribe((loader) => {
      this.setState(
        () => this.isLoading = loader
      )
    });
    (Object.entries(icons) as string[][]).forEach(([name, url]) => {
      document.body.style.setProperty(`--${name.split(/\.?(?=[A-Z])/).join('-').toLowerCase()}`, `url(${url})`);
    })
  }

  public render(): ReactNode {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          limit={5}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <RoutesApp />
        <PropagateLoader className='loader' color="var(--brand-color-1)"
          loading={this.isLoading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader" />
      </>
    );
  }
}
