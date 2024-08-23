import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { ModalCreate } from "../modals/modal-create";
import { ModalSetting } from "../modals/modal-setting";
import { CreateQuestionService } from "../services/create-question.service";
import { ActionEnum } from "../utils/enums";

@Component({
  selector: "ButtonsBar",
  standalone: true,
  imports: [ButtonModule, ModalSetting, ModalCreate],
  template: `
    <div
      class="bg-white fixed left-0 right-0 bottom-0 px-4 py-2 shadow-2 flex justify-content-between align-items-center"
    >
      <div class="flex justify-content-between align-items-center gap-2">
        <p-button
          (click)="service.handleAction(ActionEnum.AddAnswer, null)"
          icon="pi pi-plus"
          label="Lựa chọn"
        />
        <p-button
          [raised]="true"
          [severity]="
            service.data.value.ExplanationAllow ? 'danger' : 'primary'
          "
          (click)="
            service.handleAction(ActionEnum.ChangeExplanationAllow, null)
          "
          [icon]="
            service.data.value.ExplanationAllow ? 'pi pi-minus' : 'pi pi-plus'
          "
          label="Giải thích"
        />
        <ModalSetting></ModalSetting>
      </div>
      <ModalCreate></ModalCreate>
    </div>
  `,
})
export class ButtonsBar {
  ActionEnum = ActionEnum;
  constructor(public service: CreateQuestionService) {}
}
