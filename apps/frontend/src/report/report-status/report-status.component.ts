import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Case } from "../../shared/case.model";
import { firstValueFrom } from "rxjs";

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
  status: string | null = null;

  constructor(readonly sanitizer: DomSanitizer, private readonly http: HttpClient) { }

  public async fetchCase() {
    if (this.validCase) {
      this.status = (await firstValueFrom(this.http.get<Case>(`/api/report/${this.caseNo}/status`))).status;
    } else {
      this.status = null;
    }
  }

  public get validCase() {
    const valid = this.caseNo && this.caseNo.toString().length === 8;
    console.log(this.caseNo);
    return valid;
  }
}
