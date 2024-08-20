import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LayoutHeader } from "../layout/layout-header";
import { LayoutBody } from "../layout/layout-body";
import { ToastModule } from "primeng/toast";

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
