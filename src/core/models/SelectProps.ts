import { Dispatch } from 'react';

export class SelectItem<T = unknown> {
  public label: string;
  public value: T;
  public sublabel?: string;
  public selected?: boolean;
  public disabled?: boolean;

  constructor(label: string, value: T, sublabel?: string, disabled?: boolean) {
    this.label = label;
    this.value = value;
    this.sublabel = sublabel;
    this.disabled = disabled;
  }
}

export interface SelectProps<T = unknown> {
  placeholder?: string;
  options: SelectItem<T>[];
  autocomplete?: boolean;
  value?: [T, Dispatch<React.SetStateAction<T>>];
  idField?: keyof T;
  onSelect?: (selected: SelectItem<T>) => void;
  onScroll?: () => void;
}