import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

const GLOBAL = 'global'; //Use for global toast
const LOADING = 'loading'; //Use for async/await function

@Injectable({
  providedIn: 'root',
})
export class MyToastService {
  constructor(private messageService: MessageService) {}

  showSuccess(message: string) {
    this.messageService.add({
      key: GLOBAL,
      severity: 'success',
      summary: 'Thành công',
      detail: message,
    });
  }

  showLoading(message: string) {
    this.messageService.add({
      key: LOADING,
      severity: 'infor',
      summary: 'Đang tải',
      detail: message,
      life: 20000,
    });
  }

  changeLoading(severity: 'success' | 'error', message: string) {
    this.messageService.clear(LOADING);
    const summary = severity == 'success' ? 'Thành công' : 'Thất bại';
    this.messageService.add({
      key: LOADING,
      severity: severity,
      summary: summary,
      detail: message,
      life: 500,
    });
  }

  showWarning(message: string) {
    this.messageService.add({
      key: GLOBAL,
      severity: 'warn',
      summary: 'Cảnh báo',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      sticky: true,
      key: GLOBAL,
      severity: 'error',
      summary: 'Lỗi',
      detail: message,
    });
  }
}
