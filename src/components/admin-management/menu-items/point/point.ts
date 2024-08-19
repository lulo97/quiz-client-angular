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
import { empty_record, IPoint } from "./utils";
import { DatePipe } from "@angular/common";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CheckboxModule } from "primeng/checkbox";
import { TagModule } from "primeng/tag";
import { DropdownChangeEvent, DropdownModule } from "primeng/dropdown";
import { CRUD_ACTION } from "../../utils";

const SELECTOR = "Point";
const TEMPLATE_URL = "./point.html";
const _SCREEN = {
  NAME_VI: "Điểm số",
  NAME_EN: "Point",
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
    CheckboxModule,
    TagModule,
    DropdownModule,
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
export class Point {
  IsFirstRender = true;
  SCREEN = _SCREEN;
  @ViewChild("mydt") mydt: Table | undefined;
  VISIBLE_DIALOG = {
    CREATE: false,
    READ: false,
    EDIT: false,
    DELETE: false,
  };
  value: number = 0;
  isPenalty: boolean = false;
  datas: IPoint[] = [];
  selected_record: IPoint = empty_record;
  statuses = [
    { label: "Thưởng", value: false },
    { label: "Phạt", value: true },
  ];
  filter_value = "";

  constructor(private toast: MyToastService, private http: HttpClient) {}

  ngOnInit() {
    this.toast.showLoading("Đang tải bản ghi...");
  }

  ngAfterViewInit() {
    this.handleGetAll();
  }

  //Import function from utils.ts and assign it to a field in class
  _handleSort = handleSort;

  handleFilterGlobal(event: any, stringVal: any) {
    this.mydt!.filterGlobal(
      (event.target as HTMLInputElement).value,
      stringVal
    );
  }

  handleOpenCreate() {
    this.VISIBLE_DIALOG.CREATE = true;
  }

  handleOpenRead(selected_record: IPoint) {
    this.VISIBLE_DIALOG.READ = true;
    this.selected_record = selected_record;
  }

  handleOpenEdit(selected_record: IPoint) {
    this.VISIBLE_DIALOG.EDIT = true;
    this.selected_record = selected_record;
    this.value = selected_record.value;
    this.isPenalty = selected_record.isPenalty;
  }

  handleOpenDelete(selected_record: IPoint) {
    this.VISIBLE_DIALOG.DELETE = true;
    this.selected_record = selected_record;
  }

  resetAfter(action: CRUD_ACTION) {
    this.handleGetAll();
    this.value = 0;
    this.isPenalty = false;
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

  handleCreate() {
    if (this.value == 0 || this.value < 0) {
      this.toast.showWarning("Giá trị điểm phải lớn hơn 0");
      return;
    }
    const url = BACKEND_URL + this.SCREEN.NAME_EN;
    const body = {
      value: this.value,
      isPenalty: this.isPenalty,
    };
    const result = this.http.post(url, body);
    result.subscribe({
      complete: () => {
        this.resetAfter("create");
      },
      error: (response: HttpErrorResponse) => {
        this.toast.showError(response.error.detail);
        console.error(response);
      },
      next: (response) => {
        //console.log(response);
      },
    });
  }

  handleEdit() {
    if (this.value == 0 || this.value < 0) {
      this.toast.showWarning("Giá trị điểm phải lớn hơn 0");
      return;
    }
    const url =
      BACKEND_URL + `${this.SCREEN.NAME_EN}/${this.selected_record.pointId}`;
    const body = {
      pointId: this.selected_record.pointId,
      value: this.value,
      isPenalty: this.isPenalty,
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
    const url =
      BACKEND_URL + `${this.SCREEN.NAME_EN}/${this.selected_record.pointId}`;
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
