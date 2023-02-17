import { ReactElement } from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Router } from './router';

export function App(): ReactElement {
  return (
    <>
      <Main>
        <Router/>
      </Main>
    </>
  );
}