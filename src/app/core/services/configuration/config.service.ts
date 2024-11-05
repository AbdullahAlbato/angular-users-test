import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';
/**
 * A service that loads the app configurations from an external file and
 * makes them available to App components.
 **/
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: Config;
  httpClient: HttpClient;
  constructor(
    private readonly handler: HttpBackend,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
    this.config = new Config();
    this.httpClient = new HttpClient(handler);
  }
  get baseUrl() {
    return environment.baseUrl;
  }
  get authUrl() {
    return this.config.authUrl;
  }
}
export class Config {
  baseUrl: string;
  authUrl: string;
}
