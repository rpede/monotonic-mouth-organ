import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

@Component({
  selector: 'mmo-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit {
  readonly displayedColumns = ['timestamp', 'from', 'actions'];
  dataSource = new MatTableDataSource<string>(["2023-02-18T22:17:26.951Z_toby@example.com.html"]);

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  async ngOnInit() {
    this.dataSource.data = await firstValueFrom(
      this.http.get<string[]>('/api/report')
    );
  }

  show(row: string) {
    this.dialog.open(ReportDialogComponent, { data: row });
  }
}
