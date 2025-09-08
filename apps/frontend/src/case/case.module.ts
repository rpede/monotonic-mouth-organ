import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { CaseFollowComponent } from "./case-follow.component";
import { MatButtonModule } from "@angular/material/button";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "follow",
        component: CaseFollowComponent
      }
    ]),
    CommonModule,
    HttpClientModule,
    SharedModule,

    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  declarations: [
    CaseFollowComponent
  ],
})
export class CaseModule { }
