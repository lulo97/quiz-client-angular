import { Component } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { CreateQuestionService } from "../services/create-question.service";
import { DEFAULT_METADATA, ISelectItem } from "./utils";
import { compareIgnore } from "../../../utils/utils";
import { ActionEnum } from "../utils/enums";

@Component({
  selector: "LanguageSelect",
  standalone: true,
  imports: [FormsModule, DropdownModule],
  template: `
    <div class="font-semibold mb-1 w-fit">Ngôn ngữ</div>
    <p-dropdown
      appendTo="body"
      [options]="datas"
      [(ngModel)]="service.data.value.language"
      [showClear]="true"
      [editable]="false"
      [filter]="true"
      [virtualScroll]="true"
      [virtualScrollItemSize]="40"
      [style]="{ 'min-width': '20rem', width: '100%' }"
      optionLabel="name"
      placeholder="Chọn ngôn ngữ..."
    />
  `,
})
export class LanguageSelect {
  constructor(public service: CreateQuestionService) {}

  datas: ISelectItem[] = [];

  ngOnInit(): void {
    this.service.metadata$.subscribe((response) => {
      if (response) {
        this.datas = response.languages.map((ele) => ({
          id: ele.languageId,
          name: ele.name,
          value: 0,
        }));
        const find_record = this.datas.find((ele) =>
          compareIgnore(ele.name, DEFAULT_METADATA.LANGUAGE)
        );
        if (find_record) {
          this.service.handleAction(
            ActionEnum.ChangeSelectLanguage,
            find_record
          );
        }
      }
    });
  }
}
