import { ReactElement, useState } from "react";
import { icons } from "../../assets/icons/icons";
import { SelectProps } from "../../core/models/SelectProps";
import { Lang } from "../../shared/lang";
import { className } from "../../shared/utils/classname";
import "./Select.scss";

export function Select(props: SelectProps): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <div className="select-wrapper">
      <div className="input-container">
        <input
          placeholder={props.placeholder || Lang.LANG.SELECT}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />
        <span className="line-in" />
      </div>
      <div
        className={className({
          options: true,
          open,
        })}
      >
        {props.options?.length
          ? <div className="options-container">{props.options.map((option, i) => (
              <div className="option" key={i}>
                <label htmlFor={option.label}>{option.label}</label>
              </div>
            ))}</div> 
          : <div className="option-placeholder" >
            <div className="box" style={{backgroundImage: `url(${icons.emptyBox})`}}/>
            <label htmlFor={Lang.LANG.NO_OPTION_FOUND}>{Lang.LANG.NO_OPTION_FOUND}</label>
            </div>}
      </div>
    </div>
  );
}
