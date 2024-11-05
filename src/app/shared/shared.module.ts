import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { EmptyResultComponent } from './components/empty-result/empty-result.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { MatrialModule } from './modules/matrial.module';
@NgModule({
  declarations: [
    HeaderComponent,
    PaginatorComponent,
    EmptyResultComponent,
    DynamicTableComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatrialModule,
    CommonModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatrialModule,
    HeaderComponent,
    PaginatorComponent,
    EmptyResultComponent,
    DynamicTableComponent,
  ],
})
export class SharedModule {}
