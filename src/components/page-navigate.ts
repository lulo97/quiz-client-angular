import { Component } from '@angular/core';
import { routes } from '../app/app.routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'PageNavigate',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <ul>
      <li *ngFor="let route of routes">
        <a [routerLink]="route.path">{{ route.component?.name }}</a>
      </li>
    </ul>
  `,
})
export class PageNavigate {
  routes = routes;
}
