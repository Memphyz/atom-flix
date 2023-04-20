import { ReactElement, useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { loaderService } from ".";
import "./App.scss";
import { Main } from "./components/Main/Main";
import { Router } from "./router";

export const router = new BehaviorSubject<string>(window.location.pathname);

export function App(): ReactElement {
  const [ isLoading, setLoading ] = useState(loaderService.value);

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
