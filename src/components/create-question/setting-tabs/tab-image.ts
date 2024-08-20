import { Component, ViewEncapsulation } from "@angular/core";
import { ImageModule } from "primeng/image";
import { CreateQuestionService } from "../services/create-question.service";
import { ActionEnum } from "../utils/utils";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";

@Component({
  selector: "TabImage",
  standalone: true,
  imports: [ButtonModule, ImageModule, CommonModule],
  template: `
    <div class="flex flex-column gap-2 mt-4">
      <input (change)="onFileSelected($event)" type="file" id="upload" hidden />
      <div class="flex justify-content-start align-items-center gap-4">
        <label
          class="border-1 border-round w-fit px-3 py-2 hover:bg-gray-100 inline"
          for="upload"
          >Tải file</label
        >
        <p-button severity="danger" (click)="removeFile()">Xóa file</p-button>
      </div>

      <p>
        Tên tệp:
        {{
          service.data.value.ImageFile
            ? service.data.value.ImageFile.name
            : "NULL"
        }}
      </p>
      <p-image
        styleClass="my-p-image"
        *ngIf="data_url"
        [src]="data_url"
        alt="Image"
        [preview]="true"
        appendTo="body"
      />
    </div>
  `,
  styles: [
    `
      .my-p-image img {
        max-width: 100%;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class TabImage {
  constructor(public service: CreateQuestionService) {}

  data_url: string | ArrayBuffer | null = null;

  convertFileToDataUrl(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.data_url = reader.result;
      console.log(this.data_url);
    };
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.convertFileToDataUrl(input.files[0]);
      this.service.handleAction(ActionEnum.ChangeFileImage, input.files[0]);
    }
  }

  // Remove the selected file
  removeFile(): void {
    this.service.handleAction(ActionEnum.ChangeFileImage, null);
    this.data_url = null;
  }
}
