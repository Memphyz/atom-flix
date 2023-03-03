import { ReactElement, createRef, useEffect, useState } from 'react';
import { icons } from '../../assets/icons/icons';
import { SelectItem, SelectProps } from '../../core/models/SelectProps';
import { Lang } from '../../shared/lang';
import { className } from '../../shared/utils/classname';
import './Select.scss';

export function Select<T = unknown>(props: SelectProps<T>): ReactElement {

  const inputRef = createRef<HTMLInputElement>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = props.value!;

  const updateInputValue = (option: SelectItem<T>): void => {
    inputRef.current && (inputRef.current.value = option.label);
  }

  useEffect((): void => {
    if (!value) {
      return undefined;
    }
    const { idField } = props;
    const selectedOption = props.options?.find(option => {
      if (idField) {
        return value[idField] === option.value[idField];
      }
      return JSON.stringify(value) === JSON.stringify(option.value);
    });

    if (selectedOption) {
      markOptionAsSelected(selectedOption);
      updateInputValue(selectedOption);
    }
  }, [value]);

  const onSelect = (option: SelectItem<T>) => {
    updateInputValue(option);
    markOptionAsSelected(option);
    setValue(option.value);
    props.onSelect && props.onSelect(option);
  }

  const markOptionAsSelected = (option: SelectItem<T>) => {
    props.options.forEach(option => option.selected = false);
    option.selected = true;
  }

  return (
    <div className="select-wrapper">
      <div className="input-container">
        <input
          ref={inputRef}
          readOnly={!props.autocomplete}
          className={className({
            "open-style": open,
          })}
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
        {props.options?.length ? (
          <div className="options-container">
            {props.options.map((option, i) => (
              <div
                className={className({
                  option: true,
                  selected: option.selected,
                })}
                onMouseDown={() => onSelect(option)}
                key={i}
              >
                <label
                  className={className({
                    strong: option.sublabel,
                  })}
                  htmlFor={option.label}
                >
                  {option.label}
                </label>
                {option.sublabel && <span>{option.sublabel}</span>}
              </div>
            ))}
          </div>
        ) : (
          <div className="option-placeholder">
            <div
              className="box"
              style={{ backgroundImage: `url(${icons.emptyBox})` }}
            />
            <label htmlFor={Lang.LANG.NO_OPTION_FOUND}>
              {Lang.LANG.NO_OPTION_FOUND}
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
