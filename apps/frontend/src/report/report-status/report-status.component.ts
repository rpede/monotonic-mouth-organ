import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'mmo-report-status',
  templateUrl: './report-status.component.html',
  styles: [`
    .container {
      padding: 40px;
    }
`]
})
export class ReportStatusComponent {
  caseNo = "";

  constructor(readonly sanitizer: DomSanitizer) { }

  public get validCase() {
    const valid = this.caseNo && this.caseNo.toString().length === 8;
    console.log(this.caseNo);
    return valid;
  }
}
