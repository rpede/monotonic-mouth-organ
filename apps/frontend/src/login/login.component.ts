import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'mmo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  async onSubmit() {
    const { message } = await firstValueFrom(
      this.http.post<{ message: string }>('/api/auth/login', this.form.value)
    );
    this.snackBar.open('Login: ' + message, 'dismiss');
    this.auth.refresh();
  }
}
