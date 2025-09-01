import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { InfoComponent } from './info/info.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'info',
    component: InfoComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'company',
    loadChildren: () =>
      import('../company/company.module').then((m) => m.CompanyModule),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('../report/report.module').then((m) => m.ReportModule),
  },
];
