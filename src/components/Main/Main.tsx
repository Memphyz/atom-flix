import React, { ReactElement } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './Main.scss';

export function Main(props: {
  children?: ReactElement | string;
}): ReactElement {
  return (
    <main>
      <Header />
      <div className="page-content">{props.children}</div>
      <Footer />
    </main>
  );
}
