import { Component, Pipe } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { MyToastService } from "../../services/my-toast.service";
import { CommonModule } from "@angular/common";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "Login",
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CommonModule,
  ],
  standalone: true,
  template: `
    <div>
      <label for="username">Tài khoản</label>
      <input pInputText id="username" [(ngModel)]="username" />
    </div>
    <div>
      <label for="password">Mật khẩu</label>
      <p-password
        id="password"
        [(ngModel)]="password"
        [toggleMask]="true"
        [feedback]="false"
      />
    </div>
    <div>
      <p-button
        (onClick)="authentication.handleLogin(username, password)"
        label="Đăng nhập"
      />
    </div>
    <pre>{{ authentication.currentUser | json }}</pre>
  `,
})
export class Login {
  constructor(
    private toast: MyToastService,
    public authentication: AuthenticationService
  ) {}

  ngOnInit() {
    this.authentication.handleSetCurrentUser();
  }

  username: string = "";
  password: string = "";
}
