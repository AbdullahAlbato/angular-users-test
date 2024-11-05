import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router, private location: Location) {}
  goToLocation(commands: any[], queryParams?: object): void {
    const navigationExtras: NavigationExtras = {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
      preserveFragment: true,
    };
    const urlTree = this.router.createUrlTree(
      commands,
      queryParams ? navigationExtras : undefined
    );
    this.location.go(urlTree.toString());
  }
  getQueryParams(url: string): Record<string, string> {
    const queryParams: Record<string, string> = {};

    // Extract the query string from the URL
    const queryString = url.split('?')[1];

    if (queryString) {
      // Split the query string into individual key-value pairs
      const pairs = queryString.split('&');

      // Iterate through each key-value pair and populate the queryParams object
      pairs.forEach((pair) => {
        const [key, value] = pair.split('=');
        queryParams[key] = decodeURIComponent(value);
      });
    }

    return queryParams;
  }
  getQueryParamsFromLocation(): Record<string, string> {
    return this.getQueryParams(this.location.path(true));
  }
}
