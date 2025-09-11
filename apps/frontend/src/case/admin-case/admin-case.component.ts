import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CaseDialogComponent } from '../case-dialog/case-dialog.component';
import { Case } from '../../shared/case.model';

@Component({
  selector: 'mmo-admin-case',
  templateUrl: './admin-case.component.html',
  styleUrls: ['./admin-case.component.scss'],
})
export class AdminCaseComponent implements OnInit {
  readonly displayedColumns = ['caseNo', 'timestamp', 'status', 'actions'];
  dataSource = new MatTableDataSource<Case>([]);

  get company() {
    return this.route.snapshot.params['company'];
  }

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.dataSource.data = await firstValueFrom(
      this.http.get<Case[]>(
        '/api/case/company/' + this.company
      )
    );
  }

  show(row: Case) {
    this.dialog.open(CaseDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      data: `company/${this.company}/${row.caseNo}.html`
    });
  }
}
