import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mmo-select-folder-dialog',
  templateUrl: './select-folder-dialog.component.html',
})
export class SelectFolderDialogComponent {
  readonly folders$ = this.http.get<string[]>('/api/report');
  selected: string | null = null;
  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<SelectFolderDialogComponent>
  ) { }

  onSelect() {
    if (!this.selected) return;
    this.dialogRef.close(this.selected);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
