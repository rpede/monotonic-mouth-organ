import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'mmo-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.scss'],
})
export class MessageTableComponent implements OnInit {
  readonly displayedColumns = ['timestamp', 'from', 'actions'];
  dataSource = new MatTableDataSource<string>(["2023-02-18T22:17:26.951Z_toby@example.com.html"]);

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  async ngOnInit() {
    this.dataSource.data = await firstValueFrom(
      this.http.get<string[]>('/api/message')
    );
  }

  show(row: string) {
    this.dialog.open(MessageDialogComponent, { data: row });
  }
}
