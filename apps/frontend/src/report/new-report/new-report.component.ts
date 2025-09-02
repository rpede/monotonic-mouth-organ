import { Component } from '@angular/core';

@Component({
  selector: 'mmo-about',
  templateUrl: './new-report.component.html',
  styles: [
    `
    .container {
      padding: 40px;
    }
    .info {
      background-color: #d7e3ff;
      color: #00458f;
      border: 1px solid #00458f !important;
      border-radius: 16px;
      padding: 16px
    }
    `
  ]
})
export class NewReportComponent { }
