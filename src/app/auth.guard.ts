import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { MyToastService } from "../services/my-toast.service";

/*
Problem: Go to a page need authentication, f5 then guard will redirect to /Login, despite of cookie still there
- Cause: AuthenticationService have currentUser is null when component reset (f5)
- Solve: Add new Promise(resolve, reject) to AuthenticationService
*/

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: MyToastService
  ) {}

  async canActivate() {
    await this.authService.handleSetCurrentUser();
    if (this.authService.currentUser.id) {
      return true;
    } else {
      this.toast.showWarning("Bạn phải đăng nhập để truy cập trang này.");
      this.router.navigate(["/Login"]);
      return false;
    }
  }
}
