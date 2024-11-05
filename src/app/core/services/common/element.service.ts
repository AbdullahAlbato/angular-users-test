/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  scrollTo(element: Element, behavior: ScrollBehavior = 'auto', offset: number = 0): void {
    if (element) {
      const elementTop = element.getBoundingClientRect().top;
      window.scrollBy({
        top: elementTop + offset,
        left: 0,
        behavior: behavior
      });
    }
  }
}
