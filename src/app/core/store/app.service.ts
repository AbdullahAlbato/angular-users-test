import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly viewDashbordSidebar$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  onViewDashbordSidebar(): Observable<boolean> {
    return this.viewDashbordSidebar$.asObservable();
  }
  openDashbordSidebar(): void {
    this.viewDashbordSidebar$.next(true);
  }
  closeDashbordSidebar(): void {
    this.viewDashbordSidebar$.next(false);
  }
}
