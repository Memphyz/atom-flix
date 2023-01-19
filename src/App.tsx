import './App.css';
import { loaderService } from '.';
import RoutesApp from './routes';
import { Component, ReactNode } from 'react';
import { PropagateLoader } from 'react-spinners';
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
  }

  public render(): ReactNode {
    return (
      <>
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
