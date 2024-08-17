import { Routes } from '@angular/router';
import { CreateQuestion } from '../components/create-question/create-question';
import { PageNavigate } from '../components/page-navigate';
import { AdminManagement } from '../components/admin-management/admin-management';

const components = [CreateQuestion, AdminManagement];

export const routes: Routes = components.map((ele) => ({
  path: ele.name,
  component: ele,
}));

routes.push({path: "", component: PageNavigate})
