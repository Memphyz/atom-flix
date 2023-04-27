import { ReactElement, createRef, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { router } from "./App";
import { Details } from "./pages/details/details";
import { Home } from "./pages/home/home";
import { Movies } from "./pages/movies/movies";
import { TvShow } from "./pages/tvshow/tvshow";

export function Router(): ReactElement {
  const linkRef = createRef<HTMLAnchorElement>();
  const [ url, setUrl ] = useState<string>();
  const [ cache, setCache ] = useState<{ url: string, anchor: HTMLAnchorElement }>();

  useEffect(() => {
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
    linkRef?.current?.click();
    const container = document.getElementById("root")!;
    if (cache?.url === url && cache?.anchor) {
      !container.classList.contains('show') && container.classList.add("show");
      return undefined;
    }
    setCache({ url, anchor: linkRef?.current });
    setTimeout(() => {
      container?.scrollTo({ top: 0 });
      container.classList.add("show");
    }, 500);
  }, [ url, linkRef ]);

  return (
    <>
      <BrowserRouter>
        <Link hidden ref={linkRef} to={url! || window.location.pathname} />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tvshow" element={<TvShow />} />
          <Route path="details/:type/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
