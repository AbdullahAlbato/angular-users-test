import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTableComponent } from './dynamic-table.component';
import { EmptyResultComponent } from '../empty-result/empty-result.component';
import { TranslateModule } from 'src/app/core/translate/translate.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarModule } from 'primeng/sidebar';

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent<any>;
  let fixture: ComponentFixture<DynamicTableComponent<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicTableComponent,
        EmptyResultComponent
      ],
      imports: [
        TranslateModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SidebarModule

      ]
    });
    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
