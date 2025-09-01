import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NavigationModule } from '../navigation/navigation.module';
import { LoginModule } from '../login/login.module';
import { AboutComponent } from './about/about.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgxEditorModule } from 'ngx-editor';
import { MatListModule } from '@angular/material/list';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FeedbackFormComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    HttpClientModule,
    NavigationModule,
    LoginModule,

    MatListModule,

    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
