import { ReactElement } from 'react';
import './App.scss';
import { Header } from './components/header/header';

export function App(): ReactElement {
  return (
    <>
      <Header>
        <div className="test"></div>
      </Header>
    </>
  );
}