import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { filter, switchMap } from 'rxjs';

type Company = {
  name: string;
  users: { name: string }[];
};

@Component({
  selector: 'mmo-info',
  templateUrl: './info.component.html',
  styles: [
    `
      .container {
        max-width: 400px;
        min-width: 120px;
        margin: 20px auto;
      }
    `,
  ],
})
export class InfoComponent {
  readonly company$ = this.auth.user.pipe(
    filter((user) => !!user),
    switchMap((user) =>
      this.http.get<Company>(`/api/company/${user?.companyId}`)
    )
  );
  constructor(private auth: AuthService, private http: HttpClient) {}
}
