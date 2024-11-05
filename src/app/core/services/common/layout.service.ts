import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MediaSizeEnum } from '../../enums/common.enum';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private breakpointObserver: BreakpointObserver) { }
  /**
   * Checks if the current viewport size matches a specified media size breakpoint.
   *
   * @param {MediaSizeEnum} mediaSize - The media size breakpoint to check.
   * @returns {boolean} - True if the current viewport size matches the specified media size breakpoint, false otherwise.
   *
   */
  isMatchedBreakpoint(mediaSize: MediaSizeEnum): boolean {
    return this.breakpointObserver.isMatched(mediaSize);
  }

}
