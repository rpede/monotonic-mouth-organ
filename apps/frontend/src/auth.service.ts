import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

export interface UserInfo {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  companyId: number;
  iat: number;
  exp: number;
  company: {
    id: number;
    name: string;
  }
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  private readonly _user = new BehaviorSubject<UserInfo | null>(null);
  public get user$() {
    return this._user as Observable<UserInfo | null>;
  }

  public get user() {
    return this._user.value;
  }

  initialize() {
    this.load();
  }

  async refresh() {
    await this.load();
  }

  private async load() {
    try {
      const user = await firstValueFrom(
        this.http.get<UserInfo>('/api/auth/whoami')
      );
      this._user.next(user);
    } catch (error) {
      console.warn(error);
      this._user.next(null);
    }
  }
}
