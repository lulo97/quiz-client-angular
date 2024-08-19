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
import { empty_record, ISubSubject } from "./utils";
import { empty_record as empty_subject } from "../subject/utils";
import { empty_record as empty_education_level } from "../education-level/utils";
import { DatePipe } from "@angular/common";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CRUD_ACTION } from "../../utils";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ISubject } from "../subject/utils";
import { DropdownModule } from "primeng/dropdown";
import { IEducationLevel } from "../education-level/utils";

const SELECTOR = "SubSubject";
const TEMPLATE_URL = "./sub-subject.html";
const _SCREEN = {
  NAME_VI: "Chương",
  NAME_EN: "SubSubject",
};

type DropdownItem = { label: string; value: string };
const empty_dropdown_item = { label: "", value: "" };

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
    DragDropModule,
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
export class SubSubject {
  IsFirstRender = true;
  SCREEN = _SCREEN;
  @ViewChild("mydt") mydt: Table | undefined;
  VISIBLE_DIALOG = {
    CREATE: false,
    READ: false,
    EDIT: false,
    DELETE: false,
  };
  datas: ISubSubject[] = [];
  selected_record: ISubSubject = empty_record;

  dropdown_subjects: DropdownItem[] = [];
  dropdown_education_levels: DropdownItem[] = [];

  name: string = "";
  description: string = "";
  selected_subject: DropdownItem = empty_dropdown_item;
  selected_education_level: DropdownItem = empty_dropdown_item;

  constructor(private toast: MyToastService, private http: HttpClient) {}

  ngOnInit() {
    this.toast.showLoading("Đang tải bản ghi...");
  }

  ngAfterViewInit() {
    this.handleGetAll();
    this.handleGetAllSubject();
    this.handleGetAllEducationLevel();
  }

  resetAfter(action: CRUD_ACTION) {
    this.handleGetAll();
    this.handleGetAllSubject();
    this.handleGetAllEducationLevel();
    this.name = "";
    this.description = "";
    this.selected_education_level = empty_dropdown_item;
    this.selected_subject = empty_dropdown_item;
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

  //Import function from utils.ts and assign it to a field in class
  _handleSort = handleSort;

  handleFilterGlobal(event: any, stringVal: any) {
    this.mydt!.filterGlobal(
      (event.target as HTMLInputElement).value,
      stringVal
    );
  }

  handleGetAllSubject() {
    const url = BACKEND_URL + "Subject";
    const result = this.http.get(url);
    result.subscribe({
      next: (response: any) => {
        const records: ISubject[] = response;
        this.dropdown_subjects = records.map((x) => ({
          label: x.name,
          value: x.subjectId,
        }));
        const find_record = this.dropdown_subjects.find(
          (x) => x.label == "Tổng Hợp"
        );
        if (find_record) this.selected_subject = find_record;
        else {
          console.log("Dữ liệu Môn học trống!");
        }
      },
      error: (response: HttpErrorResponse) => {
        this.toast.changeLoading("error", response.error.detail);
        console.error(response);
      },
    });
  }

  handleGetAllEducationLevel() {
    const url = BACKEND_URL + "EducationLevel";
    const result = this.http.get(url);
    result.subscribe({
      next: (response: any) => {
        const records: IEducationLevel[] = response;
        this.dropdown_education_levels = records.map((x) => ({
          label: x.name,
          value: x.educationLevelId,
        }));
        const find_record = this.dropdown_education_levels.find(
          (x) => x.label == "Tổng Hợp"
        );
        if (find_record) this.selected_education_level = find_record;
        else {
          console.log("Dữ liệu Trình độ trống!");
        }
      },
      error: (response: HttpErrorResponse) => {
        this.toast.changeLoading("error", response.error.detail);
        console.error(response);
      },
    });
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
      error: (response: HttpErrorResponse) => {
        this.toast.changeLoading("error", response.error.detail);
        console.error(response);
      },
    });
  }

  handleOpenCreate() {
    this.VISIBLE_DIALOG.CREATE = true;
  }

  handleOpenRead(selected_record: ISubSubject) {
    this.VISIBLE_DIALOG.READ = true;
    this.selected_record = selected_record;
  }

  handleOpenEdit(selected_record: ISubSubject) {
    this.VISIBLE_DIALOG.EDIT = true;
    this.selected_record = selected_record;
    this.name = selected_record.name;
    this.description = selected_record.description;
    const find_subject = this.dropdown_subjects.find(
      (x) => x.value == selected_record.subjectId
    );
    if (find_subject) this.selected_subject = find_subject;
    else {
      throw new Error("Không tìm thấy Môn học của bản ghi muốn sửa!");
    }
    const find_education_level = this.dropdown_education_levels.find(
      (x) => x.value == selected_record.educationLevelId
    );
    if (find_education_level)
      this.selected_education_level = find_education_level;
    else {
      throw new Error("Không tìm thấy Trình độ của bản ghi muốn sửa!");
    }
  }

  handleOpenDelete(selected_record: ISubSubject) {
    this.VISIBLE_DIALOG.DELETE = true;
    this.selected_record = selected_record;
  }

  handleCreate() {
    if (this.name == "") {
      this.toast.showWarning("Tên trống!");
      return;
    }
    if (this.selected_education_level.value == "") {
      this.toast.showWarning("Trình độ trống!");
      return;
    }
    if (this.selected_subject.value == "") {
      this.toast.showWarning("Môn học trống!");
      return;
    }
    const url = BACKEND_URL + this.SCREEN.NAME_EN;
    const body = {
      name: this.name,
      description: this.description,
      subjectId: this.selected_subject.value,
      educationLevelId: this.selected_education_level.value,
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
    if (this.selected_education_level.value == "") {
      this.toast.showWarning("Trình độ trống!");
      return;
    }
    if (this.selected_subject.value == "") {
      this.toast.showWarning("Môn học trống!");
      return;
    }
    const url =
      BACKEND_URL +
      `${this.SCREEN.NAME_EN}/${this.selected_record.subSubjectId}`;
    const body = {
      subSubjectId: this.selected_record.subSubjectId,
      subjectId: this.selected_subject.value,
      educationLevelId: this.selected_education_level.value,
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
    const url =
      BACKEND_URL +
      `${this.SCREEN.NAME_EN}/${this.selected_record.subSubjectId}`;
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
