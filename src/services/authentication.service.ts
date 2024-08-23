import { Injectable } from "@angular/core";
import { empty_user, IUser } from "../components/login/utils";
import { BACKEND_URL } from "../utils/utils";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { MyToastService } from "./my-toast.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public currentUser = empty_user;

  constructor(private http: HttpClient, private toast: MyToastService) {
    this.handleSetCurrentUser();
  }

  async handleSetCurrentUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.currentUser.id) {
        this.toast.showSuccess("Người dùng đã đặng nhập!");
        resolve(); // Resolve immediately if user is already set
        return;
      }
      const url = BACKEND_URL + "Authentication/CurrentUser";
      this.http.get(url, { withCredentials: true }).subscribe({
        next: (response: any) => {
          if (response.user) {
            this.currentUser = response.user;
          } else {
            this.currentUser = empty_user;
          }

          resolve();
        },
        error: (response: HttpErrorResponse) => {
          this.toast.showError(response.error.detail);
          console.error(response);
          reject(response.error);
        },
      });
    });
  }

  handleLogin(username: string, password: string) {
    if (username == "") {
      this.toast.showWarning("Tài khoản trống!");
      return;
    }
    if (password == "") {
      this.toast.showWarning("Mật khẩu trống!");
      return;
    }
    const url = BACKEND_URL + "Authentication/Login";
    const body = {
      userName: username,
      password: password,
    };
    const result = this.http.post(url, body, { withCredentials: true });
    result.subscribe({
      complete: async () => {
        this.toast.showSuccess("Đăng nhập thành công!");
        await this.handleSetCurrentUser();
      },
      error: (response: HttpErrorResponse) => {
        this.toast.showError(response.error.detail);
        console.error(response);
      },
    });
  }
}
