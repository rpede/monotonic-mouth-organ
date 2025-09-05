import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";

type Case = { caseNo: string }

@Component({
  selector: 'mmo-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent {
  cases: Case[] = [];
  email = "";

  constructor(private auth: AuthService, private http: HttpClient) { }

  search() {
    this.http.get<Case[]>('/api/support/case', { params: { email: this.email } })
      .subscribe((cases) => this.cases = cases)
  }
}
