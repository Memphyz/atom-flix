import { ReactElement, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/home';
import { AvaliableLangs, Lang } from './shared/lang';
import { loaderService } from ".";

export function Router(): ReactElement {
  useEffect(() => {
    Lang.change(
      (localStorage.getItem("lang") || navigator.language) as AvaliableLangs
    );
  }, []);

  return (
    <>
      {loaderService.value && <div className="loader"></div>}
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
