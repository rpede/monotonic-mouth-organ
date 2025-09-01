import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanyTableDataSource } from './company-table/company-table-datasource';
import { CompanyTableComponent } from './company-table/company-table.component';
import { CompanyDialogComponent } from './company-dialog/company-dialog.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CompanyTableComponent,
      },
    ]),
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatListModule,
  ],
  declarations: [CompanyTableComponent, CompanyDialogComponent],
  providers: [CompanyTableDataSource],
})
export class CompanyModule {}
