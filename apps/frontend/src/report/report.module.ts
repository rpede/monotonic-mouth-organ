import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ReportTableComponent } from './report-table/report-table.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { AdminReportComponent } from './admin-report/admin-report.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ReportTableComponent,
      },
      {
        path: 'admin/:company',
        component: AdminReportComponent,
      },
    ]),
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
  ],
  declarations: [
    ReportTableComponent,
    ReportDialogComponent,
    AdminReportComponent,
  ],
})
export class ReportModule { }
