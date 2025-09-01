import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mmo-message-dialog',
  templateUrl: './message-dialog.component.html',
})
export class MessageDialogComponent {
  constructor(
    readonly sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public filename: string
  ) {}
}
