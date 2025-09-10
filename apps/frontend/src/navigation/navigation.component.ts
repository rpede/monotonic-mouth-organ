import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { firstValueFrom, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SelectFolderDialogComponent } from './select-folder-dialog/select-folder-dialog.component';

@Component({
  selector: 'mmo-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    readonly router: Router,
    readonly auth: AuthService,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  isLoggedIn() {
    return this.auth.user.pipe(map((user) => !!user));
  }

  hasRole(...roles: string[]) {
    return this.auth.user.pipe(
      map((user) => user && roles.includes(user.role))
    );
  }

  async logout() {
    await firstValueFrom(this.http.get('/api/auth/logout'));
    this.auth.refresh();
  }

  adminReportDialog() {
    const dialogRef = this.dialog.open(SelectFolderDialogComponent);
    dialogRef.afterClosed().subscribe((folder) => {
      this.router.navigateByUrl('/case/admin/' + folder);
    });
  }
}
