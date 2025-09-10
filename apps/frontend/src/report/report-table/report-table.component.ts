import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { CaseStatus } from '../../shared/case-status';
import { Case } from './case.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mmo-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit {
  readonly displayedColumns = ['caseNo', 'timestamp', 'status', 'actions'];
  dataSource = new MatTableDataSource<Case>([{
    caseNo: "29284858",
    status: CaseStatus.OPENED,
  }]);

  readonly statusOptions = [
    CaseStatus.OPENED,
    CaseStatus.INVESTIGATING,
    CaseStatus.CLOSED
  ].map((status) => status.toString());

  constructor(private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.dataSource.data = await firstValueFrom(
      this.http.get<Case[]>('/api/report')
    );
  }

  updateStatus(row: Case, event: { value: string }) {
    const body = { status: event.value };
    this.http.put<Case>(`/api/report/${row.caseNo}/status`, body).subscribe((response) => {
      this.snackBar.open(`Status changed to: ${response.status}`, 'dismiss');
    });
  }

  show(row: string) {
    this.dialog.open(ReportDialogComponent, { data: row });
  }
}
