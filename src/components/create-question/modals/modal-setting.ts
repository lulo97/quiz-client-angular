import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TabAudio } from '../setting-tabs/tab-audio';
import { TabGeneral } from '../setting-tabs/tab-general';
import { TabImage } from '../setting-tabs/tab-image';

@Component({
  selector: 'ModalSetting',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TabMenuModule,
    CommonModule,
    TabImage,
    TabAudio,
    TabGeneral,
  ],
  template: `
    <p-button (onClick)="showDialog()" icon="pi pi-cog" label="Cài đặt" />
    <p-dialog
      header="Phương tiện"
      [modal]="true"
      [(visible)]="visible"
      [style]="{ width: '90vw', height: '90vh' }"
      [dismissableMask]="true"
    >
      <div class="h-full">
        <p-tabMenu [model]="items" [(activeItem)]="activeItem" />
        <ng-container *ngIf="activeItem">
          <TabImage *ngIf="activeItem.label === 'Ảnh'"></TabImage>
          <TabAudio *ngIf="activeItem.label === 'Âm thanh'"></TabAudio>
          <TabGeneral *ngIf="activeItem.label === 'Chung'"></TabGeneral>
        </ng-container>
      </div>
    </p-dialog>
  `,
})
export class ModalSetting implements OnInit {
  visible: boolean = false;
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Chung', icon: 'pi pi-clog' },
      { label: 'Ảnh', icon: 'pi pi-image' },
      { label: 'Âm thanh', icon: 'pi pi-volume-up' },
    ];
    this.activeItem = this.items[0]; // Default to the first tab
  }

  showDialog() {
    this.visible = true;
  }
}
