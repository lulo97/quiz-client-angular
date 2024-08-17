import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'PenaltyPointSelect',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  template: `
    <div class="font-semibold mb-1 w-fit">Điểm phạt</div>
    <p-dropdown
      [options]="values"
      [(ngModel)]="selectedValue"
      [showClear]="true"
      [editable]="true"
      [filter]="true"
      [virtualScroll]="true"
      [virtualScrollItemSize]="40"
      [style]="{ 'min-width': '20rem', width: '100%' }"
      optionLabel="name"
      placeholder="Select a City"
    />
  `,
})
export class PenaltyPointSelect {
  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }

  values:
    | {
        name: string;
        code: string;
      }[]
    | undefined;

  selectedValue:
    | {
        name: string;
        code: string;
      }
    | undefined;

  ngOnInit() {
    this.values = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
}
