import { Component } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { CreateQuestionService } from "../services/create-question.service";
import { DEFAULT_METADATA, ISelectItem } from "./utils";
import { CommonModule } from "@angular/common";

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
      [(ngModel)]="selected_record"
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
  selected_record: ISelectItem | undefined = undefined;

  ngOnInit(): void {
    this.service.questionMetadata$.subscribe((response) => {
      if (response) {
        this.datas = response.books.map((ele) => ({
          code: ele.bookId,
          name: ele.name,
        }));
        const find_record = this.datas.find(
          (ele) => ele.name.toString().toLowerCase() == DEFAULT_METADATA.BOOK
        );
        if (find_record) {
          this.selected_record = find_record;
        }
      }
    });
  }
}
