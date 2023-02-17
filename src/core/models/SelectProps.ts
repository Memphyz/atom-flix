export class SelectItem<T = unknown> {
  public label: string;
  public value: T;
  public disabled?: boolean;

  constructor(label: string, value: T, disabled?: boolean) {
    this.label = label;
    this.value = value;
    this.disabled = disabled;
  }
}

export interface SelectProps<T = unknown> {
  placeholder?: string;
  options: SelectItem<T>[];
  onSelect?: (selected: SelectItem<T>) => void;
  onScroll?: () => void;
}