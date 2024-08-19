import { Component, ViewEncapsulation } from '@angular/core';
import { PanelModule } from 'primeng/panel';

//Because of wrapper <general> defined in selector, can't directly style this component respected to parent component

/*
<general>
  <div>...</div>
</general>
*/

//:host = css selector to select parent element (</general>) from <div class="...">

@Component({
  selector: 'General',
  imports: [PanelModule],
  standalone: true,
  template: `
    <div class="h-full w-full">
      <p-panel [style]="{height: '100%',}" header="Tổng quan">
        <p>Lorem ipsum dolor sit amet...</p>
      </p-panel>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class General {}
