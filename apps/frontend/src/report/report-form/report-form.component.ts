import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Editor } from 'ngx-editor';
import { firstValueFrom } from 'rxjs';
import { AuthService, UserInfo } from '../../auth.service';

@Component({
  selector: 'mmo-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnInit, OnDestroy {
  from = '';
  content = '';
  editor?: Editor;
  user?: UserInfo | null;
  caseNo?: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
  }

  async ngOnInit() {
    this.editor = new Editor();
    this.user = await firstValueFrom(this.auth.user$);
    this.from = this.user?.email ?? '';
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  onSubmit(): void {
    this.http
      .post<{ caseNo: string }>('/api/report', {
        from: this.from,
        content: this.content,
      })
      .subscribe(({ caseNo }) => {
        this.caseNo = caseNo;
        this.snackBar.open("Thank you for reporting.", 'dismiss');
      });
  }
}
