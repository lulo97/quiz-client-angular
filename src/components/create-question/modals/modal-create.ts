import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { CreateQuestionService } from "../services/create-question.service";
import { CommonModule } from "@angular/common";
<<<<<<< HEAD
import { ActionEnum } from "../utils/enums";
=======
import { ICreateQuestionData } from "../utils/utils";
>>>>>>> a425177170afafb3bcb78b5f75eba04580c4e3af

@Component({
  selector: "ModalCreate",
  standalone: true,
  imports: [ButtonModule, DialogModule, CommonModule],
  template: `
    <p-button (onClick)="this.visible = true" label="Tạo" />
    <p-dialog
      header="Xác nhận tạo câu hỏi"
      [modal]="true"
      [(visible)]="visible"
      [style]="{ width: '50vw' }"
      [dismissableMask]="true"
    >
      <div>
        <p>Bạn có xác nhận tạo câu hỏi không?</p>
        <pre>{{ service.data.value | json }}</pre>
<<<<<<< HEAD
        <p-button
          class="flex justify-content-end"
          label="Xác nhận"
          (onClick)="handleCreate()"
        />
=======
        <hr />
        <pre>{{ service.selectedMetadata.value | json }}</pre>
        <p-button class="flex justify-content-end" label="Xác nhận" />
>>>>>>> a425177170afafb3bcb78b5f75eba04580c4e3af
      </div>
    </p-dialog>
  `,
})
export class ModalCreate {
  visible: boolean = false;
  constructor(public service: CreateQuestionService) {}

  handleCreate() {
    this.service.handleAction(ActionEnum.ConfirmCreate, null);
  }
}
