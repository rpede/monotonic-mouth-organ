import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

type Message = {
  timestamp: string;
  from: string;
  filename: string;
};

@Component({
  selector: 'mmo-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss'],
})
export class AdminReportComponent implements OnInit {
  readonly displayedColumns = ['timestamp', 'from', 'actions'];
  dataSource = new MatTableDataSource<Message>([]);

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.dataSource.data = await firstValueFrom(
      this.http.get<string[]>(
        '/api/report/company/' + this.route.snapshot.params['company']
      )
    ).then((filenames) =>
      filenames.map((filename) => {
        const split = filename.split('/')[1];
        console.log(split);
        const [timestamp, from] = split.split('_');
        return { timestamp, from, filename } as Message;
      })
    );
  }

  show(filename: string) {
    this.dialog.open(ReportDialogComponent, { data: 'company/' + filename });
  }
}
