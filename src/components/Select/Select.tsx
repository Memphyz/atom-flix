import { ReactElement, useState } from "react";
import { SelectProps } from "../../core/models/SelectProps";
import { Lang } from "../../shared/lang";
import { className } from "../../shared/utils/classname";
import "./Select.scss";

export function Select(props: SelectProps): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <div className="select-wrapper">
      <input
        placeholder={props.placeholder || open.toString()}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      <div
        className={className({
          options: true,
          open,
        })}
      >
        {props.options?.length
          ? props.options.map((option, i) => (
              <div className="option" key={i}>
                <label htmlFor={option.label}>{option.label}</label>
              </div>
            ))
          : "Nada"}
      </div>
    </div>
  );
}
