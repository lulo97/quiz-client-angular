import { Component } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { CreateQuestionService } from "../services/create-question.service";
import { ISelectItem } from "./utils";

@Component({
  selector: "PenaltyPointSelect",
  standalone: true,
  imports: [FormsModule, DropdownModule],
  template: `
    <div class="font-semibold mb-1 w-fit">Điểm phạt</div>
    <p-dropdown
      appendTo="body"
      [options]="datas"
<<<<<<< HEAD
      [(ngModel)]="service.data.value.penaltyPoint"
=======
      [(ngModel)]="service.selectedMetadata.value.penaltyPoint"
>>>>>>> a425177170afafb3bcb78b5f75eba04580c4e3af
      [showClear]="true"
      [editable]="false"
      [filter]="true"
      [virtualScroll]="true"
      [virtualScrollItemSize]="40"
      [style]="{ 'min-width': '20rem', width: '100%' }"
      optionLabel="value"
      placeholder="Chọn điểm phạt..."
    />
  `,
})
export class PenaltyPointSelect {
  constructor(public service: CreateQuestionService) {}

  datas: ISelectItem[] = [];

  ngOnInit(): void {
    this.service.metadata$.subscribe((response) => {
      if (response) {
        this.datas = response.penaltyPoints.map((ele) => ({
          id: ele.pointId,
          name: "",
          value: ele.value,
        }));
      }
    });
  }
}
