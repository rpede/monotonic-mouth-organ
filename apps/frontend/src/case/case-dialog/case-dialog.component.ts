import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../auth.service';
import { Case } from '../../shared/case.model';

@Component({
  selector: 'mmo-case-dialog',
  templateUrl: './case-dialog.component.html',
})
export class CaseDialogComponent {
  constructor(
    readonly sanitizer: DomSanitizer,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public case_: Case,
  ) { }

  get filename() {
    return `${this.case_.company.name}/${this.case_.caseNo}.html`;
  }
}
