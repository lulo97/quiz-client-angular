import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LayoutHeader } from "../layout/layout-header";
import { LayoutBody } from "../layout/layout-body";
import { ToastModule } from "primeng/toast";
<<<<<<< HEAD
import { AuthenticationService } from "../services/authentication.service";
=======
>>>>>>> a425177170afafb3bcb78b5f75eba04580c4e3af

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LayoutHeader, LayoutBody, ToastModule],
  template: `
    <div class="h-screen w-screen flex flex-column overflow-x-hidden">
      <p-toast key="global" [life]="1000" />
      <p-toast key="loading" />
      <LayoutHeader></LayoutHeader>
      <LayoutBody>
        <router-outlet></router-outlet>
      </LayoutBody>
    </div>
  `,
})
export class AppComponent {
  title = "frontend";
}
