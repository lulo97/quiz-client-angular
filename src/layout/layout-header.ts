import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';

@Component({
  selector: 'LayoutHeader',
  standalone: true,
  imports: [MenubarModule, AvatarModule],
  template: `
    <div
      class="bg-white border-gray-200 shadow-1 px-5 py-1 flex justify-content-between align-items-center h-fit"
    >
      <div
        (click)="router.navigate(['/'])"
        class="font-semibold text-2xl hover:text-gray-500 cursor-pointer"
      >
        QuizQuest
      </div>
      <div><p-menubar [model]="items" /></div>
      <div>
        <p-avatar
          image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
          size="normal"
          shape="circle"
        />
      </div>
    </div>
  `,
})
export class LayoutHeader {
  constructor(public router: Router) {}
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Features',
      icon: 'pi pi-star',
    },
    {
      label: 'Projects',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Components',
          icon: 'pi pi-bolt',
        },
        {
          label: 'Blocks',
          icon: 'pi pi-server',
        },
      ],
    },
  ];
}
