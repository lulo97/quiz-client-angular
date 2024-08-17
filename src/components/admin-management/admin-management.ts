import { Component, ViewChild, ViewContainerRef } from "@angular/core";
import { MenuItem } from "primeng/api";
import { TieredMenuModule } from "primeng/tieredmenu";
import { General } from "./menu-items/general";
import { Subject } from "./menu-items/subject/subject";
import { Language } from "./menu-items/language/language";
import { EducationLevel } from "./menu-items/education-level/education-level";
import { DifficultLevel } from "./menu-items/difficult-level/difficult-level";
import { Point } from "./menu-items/point/point";
import { SubSubject } from "./menu-items/sub-subject/sub-subject";

@Component({
  selector: "AdminManagement",
  imports: [TieredMenuModule],
  standalone: true,
  template: `
    <div class="h-full flex gap-1 p-2">
      <p-tieredMenu
        [style]="{
          height: '100%',
          width: 'fit-content',
          'white-space': 'nowrap',
        }"
        [model]="items"
      ></p-tieredMenu>
      <ng-template #dynamicContainer></ng-template>
    </div>
  `,
})

//class MyClass implements OnInit = must implement ngOnInit()
//Don't implement OnInit is still ok but is not recommend
//NOTE: OnInit is not make sure child views is rendered

//ngAfterViewInit = called after view is totally rendered, so ViewChild depend on it
export class AdminManagement {
  @ViewChild("dynamicContainer", { read: ViewContainerRef })
  container!: ViewContainerRef;

  ngAfterViewInit() {
    this.handleChangeMenuItem(SubSubject);
  }

  handleChangeMenuItem(new_component: any) {
    this.container.clear();
    this.container.createComponent(new_component);
  }

  items: MenuItem[] = [
    {
      label: "Tổng quan",
      icon: "pi pi-book",
      command: () => this.handleChangeMenuItem(General),
    },
    {
      label: "Môn học",
      icon: "pi pi-book",
      command: () => this.handleChangeMenuItem(Subject),
    },
    {
      label: "Trình độ",
      icon: "pi pi-graduation-cap",
      command: () => this.handleChangeMenuItem(EducationLevel),
    },
    {
      label: "Chương",
      icon: "pi pi-file",
      command: () => this.handleChangeMenuItem(SubSubject),
    },
    {
      label: "Độ khó",
      icon: "pi pi-star",
      command: () => this.handleChangeMenuItem(DifficultLevel),
    },
    {
      label: "Ngôn ngữ",
      icon: "pi pi-globe",
      command: () => this.handleChangeMenuItem(Language),
    },
    {
      label: "Điểm",
      icon: "pi pi-chart-line",
      command: () => this.handleChangeMenuItem(Point),
    },
  ];
}
