import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { CaseStatus } from '../../shared/case-status';
import { Case } from '../../shared/case.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseDialogComponent } from '../case-dialog/case-dialog.component';

@Component({
  selector: 'mmo-case-table',
  templateUrl: './case-table.component.html',
  styleUrls: ['./case-table.component.scss'],
})
export class CaseTableComponent implements OnInit {
  readonly displayedColumns = ['caseNo', 'timestamp', 'status', 'length', 'actions'];
  dataSource = new MatTableDataSource<Case>([
    // { caseNo: "29284858", status: CaseStatus.OPENED, }
  ]);

  readonly statusOptions = [
    CaseStatus.OPENED,
    CaseStatus.INVESTIGATING,
    CaseStatus.CLOSED
  ].map((status) => status.toString());

  constructor(private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.dataSource.data = await firstValueFrom(
      this.http.get<Case[]>('/api/case')
    );
  }

  updateStatus(row: Case, event: { value: string }) {
    const body = { status: event.value };
    this.http.put<Case>(`/api/case/${row.caseNo}/status`, body).subscribe((response) => {
      this.snackBar.open(`Status changed to: ${response.status}`, 'dismiss');
    });
  }

  show(row: Case) {
    this.dialog.open(CaseDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      height: '600px',
      maxHeight: '90vw',
      data: `${row.caseNo}.html`
    });
  }
}
