import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyListItem } from '../company-table/company-table-datasource';

// TODO: Replace this with your own data model type
export interface UserData extends CompanyListItem {
  users: { name: string }[];
}

@Component({
  selector: 'mmo-user-dialog',
  templateUrl: './company-dialog.component.html',
})
export class CompanyDialogComponent {
  data$ = this.http.get<UserData>(`/api/company/${this.id}`);
  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {}
}
