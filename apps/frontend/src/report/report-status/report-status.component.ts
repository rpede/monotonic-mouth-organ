import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { firstValueFrom } from "rxjs";

interface Case {
  caseNo: string;
  status: string;
  company: { name: string };
  length: number;
}

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
  case: Case | null = null;
  length: number | string | null = null;

  constructor(readonly sanitizer: DomSanitizer, private readonly http: HttpClient) { }

  public async fetchCase() {
    if (this.validCase) {
      this.case = (await firstValueFrom(this.http.get<Case>(`/api/case/${this.caseNo}/status`)));
      this.length = (await firstValueFrom(this.http.get<number | string>(`/api/case/${this.caseNo}/length`)));
    } else {
      this.case = null;
    }
  }

  public get validCase() {
    const valid = this.caseNo && this.caseNo.toString().length === 8;
    return valid;
  }
}
