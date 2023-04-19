import { interval, of } from "rxjs";

export class DebounceTime {
  private callback: (...args) => void;
  private timeoutId: number;

  constructor (callback: (...args) => void, private delay = 500) {
    this.callback = callback;
  }

  public call(...args): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => this.callback(...args), this.delay) as any;
  }
}