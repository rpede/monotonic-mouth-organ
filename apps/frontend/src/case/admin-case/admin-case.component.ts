import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CaseDialogComponent } from '../case-dialog/case-dialog.component';

type Message = {
  timestamp: string;
  from: string;
  filename: string;
};

@Component({
  selector: 'mmo-admin-case',
  templateUrl: './admin-case.component.html',
  styleUrls: ['./admin-case.component.scss'],
})
export class AdminCaseComponent implements OnInit {
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
    this.dialog.open(CaseDialogComponent, { data: 'company/' + filename });
  }
}
