import { Component } from "@angular/core";

@Component({
  selector: 'mmo-case-follow',
  templateUrl: './case-follow.component.html',
  styles: [`
    .container {
      padding: 40px;
    }
`]
})
export class CaseFollowComponent {
  caseNo = "";

  public get validCase() {
    const valid = this.caseNo && this.caseNo.toString().length === 8;
    console.log(this.caseNo);
    return valid;
  }
}
