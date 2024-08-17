import { Component } from '@angular/core';

@Component({
  selector: 'LayoutBody',
  standalone: true,
  imports: [],
  template: ` <div class="p-1 h-full w-full"><ng-content></ng-content></div> `,
  styles: [
    `
      :host {
        flex: 1 1 0%;
      }
    `,
  ],
})
export class LayoutBody {}
