import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'TabImage',
  standalone: true,
  imports: [FileUploadModule, ImageModule],
  template: `
    <div class='flex flex-column gap-2 mt-2'>
      <p-fileUpload
        chooseLabel="Tải lên ảnh"
        chooseIcon="pi pi-upload"
        accept="image/*"
        [showUploadButton]="false"
        [multiple]="false"
        maxFileSize="1000000"
        (onUpload)="onUpload($event)"
      />
      <p-image
        src="https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg"
        alt="Image"
        width="100%"
      />
    </div>
  `,
})
export class TabImage {
  onUpload(event: UploadEvent) {
    console.log(event);
  }
}
