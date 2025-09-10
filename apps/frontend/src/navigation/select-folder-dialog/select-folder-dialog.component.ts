import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Case } from '../../shared/case.model';
import { Company } from '../../shared/company.model';

@Component({
  selector: 'mmo-select-folder-dialog',
  templateUrl: './select-folder-dialog.component.html',
})
export class SelectFolderDialogComponent {
  readonly companies$ = this.http.get<Company[]>('/api/company');
  selected: Company | null = null;
  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<SelectFolderDialogComponent>
  ) { }

  onSelect() {
    if (!this.selected) return;
    this.dialogRef.close(this.selected.name);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
