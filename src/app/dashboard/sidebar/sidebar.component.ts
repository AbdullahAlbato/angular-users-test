import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from '../../core/models/common.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit, OnDestroy {
  sidebarLinks = [
    { label: 'Users', icon: 'people', route: '/dashboard/users' },
    { label: 'Settings', icon: 'settings', route: '#' },
    { label: 'Reports', icon: 'bar_chart', route: '#' },
  ];
  constructor() {}
  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
