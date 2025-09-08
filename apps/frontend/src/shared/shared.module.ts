import { NgModule } from "@angular/core";
import { CaseCreatedPipe } from "./case-created.pipe";

@NgModule({
  declarations: [
    CaseCreatedPipe,
  ],
  exports: [
    CaseCreatedPipe,
  ]
})
export class SharedModule { }
