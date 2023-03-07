import { ReactElement, createRef, useEffect, useState } from "react";
import "./App.scss";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Router } from "./router";
import { loaderService } from ".";
import { Link } from "react-router-dom";
import { BehaviorSubject } from "rxjs";

export const router = new BehaviorSubject<string>(window.location.pathname);

export function App(): ReactElement {
  const [isLoading, setLoading] = useState(loaderService.value);

  useEffect(() => {
    loaderService.subscribe((isLoading) => {
      setLoading(isLoading);
    });
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loader">
          <div className="balls" />
        </div>
      )}
      <Main>
        <Router />
      </Main>
    </>
  );
}
