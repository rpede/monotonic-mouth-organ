import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ReportFormComponent } from './report-form/report-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxEditorModule } from 'ngx-editor';
import { MatCardModule } from '@angular/material/card';
import { NewReportComponent } from './new-report/new-report.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ReportTableComponent,
      },
      {
        path: 'new',
        component: NewReportComponent,
      },
      {
        path: 'admin/:company',
        component: AdminReportComponent,
      },
    ]),
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    NgxEditorModule,

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
    ReportFormComponent,
    NewReportComponent
  ],
})
export class ReportModule { }
