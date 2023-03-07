import { ReactElement, createRef, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { router } from "./App";
import { Details } from "./pages/details/details";
import { Home } from "./pages/home/home";
import { AvaliableLangs, Lang } from "./shared/lang";

export function Router(): ReactElement {
  const linkRef = createRef<HTMLAnchorElement>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    Lang.change(
      (localStorage.getItem("lang") || navigator.language) as AvaliableLangs
    );
    router.subscribe((url) => {
      if (!url || url === window.location.pathname) {
        return undefined;
      }
      const container = document.getElementById("root")!;
      container.classList.remove("show");
      setTimeout(() => {
        setUrl(url);
      }, 500);
    });
  }, []);

  useEffect(() => {
    linkRef.current?.click();
    setTimeout(() => {
      const container = document.getElementById("root")!;
      container?.scrollTo({ top: 0 });
      container.classList.add("show");
    }, 500);
  }, [url]);

  return (
    <>
      <BrowserRouter>
        <Link hidden ref={linkRef} to={url! || window.location.pathname} />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="details/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
