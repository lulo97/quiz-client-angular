import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { CreateQuestionService } from "../services/create-question.service";
import { CommonModule } from "@angular/common";
import { ICreateQuestionData } from "../utils/utils";

@Component({
  selector: "ModalCreate",
  standalone: true,
  imports: [ButtonModule, DialogModule, CommonModule],
  template: `
    <p-button (onClick)="showDialog()" label="Tạo" />
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
        <hr />
        <pre>{{ service.selectedMetadata.value | json }}</pre>
        <p-button class="flex justify-content-end" label="Xác nhận" />
      </div>
    </p-dialog>
  `,
})
export class ModalCreate {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  constructor(public service: CreateQuestionService) {}
}
