import { Component, SimpleChanges, ViewChild } from "@angular/core";
import { PanelModule } from "primeng/panel";
import { Table, TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { MyToastService } from "../../../../services/my-toast.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BACKEND_URL, handleSort } from "../../../../utils/utils";
import { FormsModule } from "@angular/forms";
import { empty_record, IEducationLevel } from "./utils";
import { DatePipe } from "@angular/common";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CRUD_ACTION } from "../../utils";

const SELECTOR = "EducationLevel";
const TEMPLATE_URL = "./education-level.html";
const _SCREEN = {
  NAME_VI: "Trình độ học vấn",
  NAME_EN: "EducationLevel",
};

@Component({
  selector: SELECTOR,
  imports: [
    PanelModule,
    TableModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    DatePipe,
    InputTextareaModule,
  ],
  standalone: true,
  templateUrl: TEMPLATE_URL,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class EducationLevel {
  IsFirstRender = true;
  SCREEN = _SCREEN;
  @ViewChild("mydt") mydt: Table | undefined;
  VISIBLE_DIALOG = {
    CREATE: false,
    READ: false,
    EDIT: false,
    DELETE: false,
  };
  name: string = "";
  description: string = "";
  datas: IEducationLevel[] = [];
  selected_record: IEducationLevel = empty_record;

  constructor(private toast: MyToastService, private http: HttpClient) {}

  ngOnInit() {
    this.toast.showLoading("Đang tải bản ghi...");
  }

  ngAfterViewInit() {
    this.handleGetAll();
  }

  //Import function from utils.ts and assign it to a field in class
  _handleSort = handleSort;

  resetAfter(action: CRUD_ACTION) {
    this.handleGetAll();
    this.name = "";
    this.description = "";
    if (action == "create") {
      this.toast.showSuccess("Tạo thành công!");
      this.VISIBLE_DIALOG.CREATE = false;
    }
    if (action == "edit") {
      this.toast.showSuccess("Sửa thành công!");
      this.VISIBLE_DIALOG.EDIT = false;
    }
    if (action == "delete") {
      this.toast.showSuccess("Xóa thành công!");
      this.VISIBLE_DIALOG.DELETE = false;
    }
  }
  handleFilterGlobal(event: any, stringVal: any) {
    this.mydt!.filterGlobal(
      (event.target as HTMLInputElement).value,
      stringVal
    );
  }

  handleGetAll() {
    const url = BACKEND_URL + this.SCREEN.NAME_EN;
    const result = this.http.get(url);
    result.subscribe({
      complete: () => {
        if (this.IsFirstRender) {
          this.toast.changeLoading("success", "Tải thành công!");
          this.IsFirstRender = false;
        }
      },
      next: (response: any) => {
        this.datas = response;
      },
      error: (error) => {
        this.toast.changeLoading("error", "Lỗi máy chủ!");
        console.error(error);
      },
    });
  }

  handleOpenCreate() {
    this.VISIBLE_DIALOG.CREATE = true;
  }

  handleOpenRead(selected_record: IEducationLevel) {
    this.VISIBLE_DIALOG.READ = true;
    this.selected_record = selected_record;
  }

  handleOpenEdit(selected_record: IEducationLevel) {
    this.VISIBLE_DIALOG.EDIT = true;
    this.selected_record = selected_record;
    this.name = selected_record.name;
    this.description = selected_record.description;
  }

  handleOpenDelete(selected_record: IEducationLevel) {
    this.VISIBLE_DIALOG.DELETE = true;
    this.selected_record = selected_record;
  }

  handleCreate() {
    if (this.name == "") {
      this.toast.showWarning("Tên trống!");
      return;
    }
    const url = BACKEND_URL + this.SCREEN.NAME_EN;
    const body = {
      name: this.name,
      description: this.description,
    };
    const result = this.http.post(url, body);
    result.subscribe({
      complete: () => {
        this.resetAfter("create");
      },
      next: (response) => {
        //console.log(response);
      },
      error: (response: HttpErrorResponse) => {
        this.toast.showError(response.error.detail);
        console.error(response);
      },
    });
  }

  handleEdit() {
    if (this.name == "") {
      this.toast.showWarning("Tên trống!");
      return;
    }
    const url =
      BACKEND_URL +
      `${this.SCREEN.NAME_EN}/${this.selected_record.educationLevelId}`;
    const body = {
      educationLevelId: this.selected_record.educationLevelId,
      name: this.name,
      description: this.description,
      createdAt: this.selected_record.createdAt,
    };
    const result = this.http.put(url, body);
    result.subscribe({
      complete: () => {
        this.resetAfter("edit");
      },
      next: (response) => {
        //console.log(response);
      },
      error: (response: HttpErrorResponse) => {
        this.toast.showError(response.error.detail);
        console.error(response);
      },
    });
  }

  handleDelete() {
    if (this.selected_record.subSubjects.length > 0) {
      this.toast.showWarning("Trình đọc học vấn có Chương phụ thuộc!");
      return;
    }
    const url =
      BACKEND_URL +
      `${this.SCREEN.NAME_EN}/${this.selected_record.educationLevelId}`;
    const result = this.http.delete(url);
    result.subscribe({
      complete: () => {
        this.resetAfter("delete");
      },
      next: (response) => {
        //console.log(response);
      },
      error: (response: HttpErrorResponse) => {
        this.toast.showError(response.error.detail);
        console.error(response);
      },
    });
  }
}
