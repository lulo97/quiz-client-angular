import { Routes } from "@angular/router";
import { CreateQuestion } from "../components/create-question/create-question";
import { PageNavigate } from "../components/page-navigate/page-navigate";
import { AdminManagement } from "../components/admin-management/admin-management";
import { Login } from "../components/login/login";
import { AuthGuard } from "./auth.guard";

//Don't require login
const guest_components = [Login];
const guest_routes: Routes = guest_components.map((ele) => ({
  path: ele.name.replace("_", ""),
  component: ele,
}));

//Must login
const auth_components = [CreateQuestion, AdminManagement];
const auth_routes: Routes = auth_components.map((ele) => ({
  path: ele.name.replace("_", ""),
  component: ele,
  canActivate: [AuthGuard],
}));

//Combine routes
export const routes = [
  ...guest_routes,
  ...auth_routes,
  { path: "", component: PageNavigate },
];
