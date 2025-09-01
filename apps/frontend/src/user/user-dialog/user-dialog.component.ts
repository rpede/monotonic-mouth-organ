import { HttpClient } from '@angular/common/http';
import {  Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserTableItem } from '../user-table/user-table-datasource';

// TODO: Replace this with your own data model type
export interface UserData extends UserTableItem {
  email: string;
  company: { name: string };
}

@Component({
  selector: 'mmo-user-dialog',
  templateUrl: './user-dialog.component.html',
})
export class UserDialogComponent {
  data$ = this.http.get<UserData>(`/api/user/${this.id}`);
  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {}
}
