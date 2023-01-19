import { BehaviorSubject } from 'rxjs';

export class LoaderService {
     private loaderSubject = new BehaviorSubject(false);

     public show(): void {
          this.loaderSubject.next(true);
     }

     public hide(): void {
          this.loaderSubject.next(false);
     }

     public onChange(): BehaviorSubject<boolean> {
          return this.loaderSubject
     }
}