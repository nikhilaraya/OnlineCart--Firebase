import {AuthGuard} from './services/auth-guard.service';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ModuleWithProviders} from '@angular/core';
import {TestComponent} from './components/test/test.component';
import {TodoComponent} from './todo/todo.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {WebsiteListComponent} from './components/website/website-list/website-list.component';
import {RegisterComponent} from './components/user/register/register.component';
import {LoginComponent} from './components/user/login/login.component';
import {ProfileComponent} from './components/user/profile/profile.component';


const APP_ROUTES: Routes = [
  {path: 'register', component : RegisterComponent},
  {path: '', component : HomeComponent},
  {path: 'login', component : LoginComponent},
  {path: 'profile', component : ProfileComponent},
  {path: 'todo', component : TodoComponent},
  {path: 'todoList', component : TodoListComponent},
  {path: 'test', component: TestComponent},
  {path: 'website', component: WebsiteListComponent}
];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
