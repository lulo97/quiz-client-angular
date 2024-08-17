import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { Component } from '@angular/core';

@Component({
  selector: 'TabAudio',
  standalone: true,
  imports: [FileUploadModule],
  template: `
    <div class="flex flex-column gap-2 mt-2">
      <p-fileUpload
        chooseLabel="Tải lên âm thanh"
        chooseIcon="pi pi-upload"
        accept="audio/*"
        [showUploadButton]="false"
        [multiple]="false"
        maxFileSize="1000000"
        (onUpload)="onUpload($event)"
      />
      <audio class="w-full" controls="">
        <source
          src="https://www.w3schools.com/html/horse.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  `,
})
export class TabAudio {
  onUpload(event: UploadEvent) {
    console.log(event);
  }
}
