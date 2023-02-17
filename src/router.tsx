import { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";

export function Router(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={
          <Home/>
        }/>
      </Routes>
    </BrowserRouter>
  );
}
