import React, { ReactElement, useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import "./Main.scss";
import { className } from "../../shared/utils/classname";

export function Main(props: {
  children?: ReactElement | string;
}): ReactElement {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const root = document.getElementById("root")!;
    root.addEventListener("scroll", () => {
      setShowArrow(root.scrollTop > 300);
    });
  }, []);

  function scrollTop(): void {
    const container = document.getElementById("root");
    container?.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div
        className={className({
          "scroll-top": true,
          show: showArrow,
        })}
        onClick={scrollTop}
      />
      <main>
        <Header />
        <section className="page-content">{props.children}</section>
        <Footer />
      </main>
    </>
  );
}
