import { Component } from '@angular/core';
import data from './about.data';

@Component({
  selector: 'mmo-about',
  templateUrl: './about.component.html',
  styles: [
    `
    .container {
        padding: 40px;
    }
    `
  ]
})
export class AboutComponent {
  readonly aboutArticle = data;
}
