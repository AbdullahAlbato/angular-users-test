/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'empty-result',
  templateUrl: './empty-result.component.html',
  styleUrls: ['./empty-result.component.scss'],
})
export class EmptyResultComponent {
  @Input() msgTitle: string = '';
  @Input() msgContent: string = '';
  @Input() link: string | string[] = [];
  @Input() linkTitle: string = '';
  @Output() onClickLink: EventEmitter<void> = new EventEmitter<void>();
}
