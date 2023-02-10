export class SelectOption<T> {
     public label: string;
     public value: T;

     constructor(label: string, value: T) {
          this.label = label;
          this.value = value;
     }
}