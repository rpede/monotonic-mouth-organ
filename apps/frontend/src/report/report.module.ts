import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReportFormComponent } from './report-form/report-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxEditorModule } from 'ngx-editor';
import { MatCardModule } from '@angular/material/card';
import { NewReportComponent } from './new-report/new-report.component';
import { SharedModule } from '../shared/shared.module';
import { ReportStatusComponent } from './report-status/report-status.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "status",
        component: ReportStatusComponent
      },
      {
        path: 'new',
        component: NewReportComponent,
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
    MatButtonModule,
    NgxEditorModule,
  ],
  declarations: [
    ReportStatusComponent,
    ReportFormComponent,
    NewReportComponent
  ],
})
export class ReportModule { }
