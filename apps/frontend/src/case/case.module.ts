import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { SharedModule } from "../shared/shared.module";
import { AdminCaseComponent } from "./admin-case/admin-case.component";
import { CaseTableComponent } from "./case-table/case-table.component";
import { CaseDialogComponent } from "./case-dialog/case-dialog.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CaseTableComponent,
      },
      {
        path: 'admin/:company',
        component: AdminCaseComponent,
      },
    ]),
    CommonModule,
    HttpClientModule,
    SharedModule,

    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
  ],
  declarations: [
    CaseTableComponent,
    AdminCaseComponent,
    CaseDialogComponent,
  ],
})
export class CaseModule { }
