import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  companyId: number | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  private readonly _user = new BehaviorSubject<User | null>(null);
  public get user() {
    return this._user as Observable<User | null>;
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
        this.http.get<User>('/api/auth/whoami')
      );
      this._user.next(user);
    } catch (error) {
      console.warn(error);
      this._user.next(null);
    }
  }
}
