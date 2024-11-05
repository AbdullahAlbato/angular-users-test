/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
