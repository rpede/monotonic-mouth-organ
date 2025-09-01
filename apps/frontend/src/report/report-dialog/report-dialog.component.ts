import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mmo-message-dialog',
  templateUrl: './report-dialog.component.html',
})
export class ReportDialogComponent {
  constructor(
    readonly sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public filename: string
  ) { }
}
