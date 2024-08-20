import { Component } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { CreateQuestionService } from "../services/create-question.service";
import { DEFAULT_METADATA, ISelectItem } from "./utils";
import { CommonModule } from "@angular/common";
import { ActionEnum } from "../utils/utils";
import { compareIgnore } from "../../../utils/utils";

@Component({
  selector: "BookSelect",
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  template: `
    <div class="font-semibold mb-1 w-fit">Sách giáo khoa</div>
    <p-dropdown
      [editable]="false"
      appendTo="body"
      [options]="datas"
      [(ngModel)]="service.selectedMetadata.value.book"
      [showClear]="true"
      [filter]="true"
      [virtualScroll]="true"
      [virtualScrollItemSize]="40"
      [style]="{ 'min-width': '20rem', width: '100%' }"
      optionLabel="name"
      placeholder="Chọn bộ sách..."
    />
  `,
})
export class BookSelect {
  constructor(public service: CreateQuestionService) {}

  datas: ISelectItem[] = [];

  ngOnInit(): void {
    this.service.metadata$.subscribe((response) => {
      if (response) {
        this.datas = response.books.map((ele) => ({
          id: ele.bookId,
          name: ele.name,
          value: 0,
        }));
        const find_record = this.datas.find((ele) =>
          compareIgnore(ele.name, DEFAULT_METADATA.BOOK)
        );
        if (find_record) {
          this.service.handleAction(ActionEnum.ChangeSelectBook, find_record);
        }
      }
    });
  }
}
