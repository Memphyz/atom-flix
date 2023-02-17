import { ReactElement } from "react";
import { Lang } from "../../shared/lang";
import { Select } from "../Select/Select";
import "./Footer.scss";

export function Footer(): ReactElement {
  return (
    <footer>
      <div className="container left-content">
        <div className="wrapper">
          <span>
            <label htmlFor={Lang.LANG.DEVELOPED_BY}>
              {Lang.LANG.DEVELOPED_BY}:{" "}
            </label>
            <label htmlFor="Lucas Ribeiro" translate="no">
              Lucas Ribeiro
            </label>
          </span>
          <span>
            <label htmlFor={Lang.LANG.FRAMEWORK_USED}>
              {Lang.LANG.FRAMEWORK_USED}:{" "}
            </label>
            <label htmlFor="React" translate="no">
              React
            </label>
          </span>
        </div>
      </div>
      <div className="container middle-content">
        <span>{Lang.LANG.APPLICATION_DESC}</span>
      </div>
      <div className="container right-content">
        <Select options={[]}/>
      </div>
    </footer>
  );
}
