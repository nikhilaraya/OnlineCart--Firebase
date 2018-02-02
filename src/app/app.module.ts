import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import {Routing} from './app.routing';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {TestService} from './services/test.service.client';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoEditComponent } from './todo-list/todo-edit.component';
import {TodoService} from './services/todo.service.client';
import { WebsiteListComponent } from './components/website/website-list/website-list.component';
import {WebsiteService} from './services/website.service.client';
import { RegisterComponent } from './components/user/register/register.component';
import {UserService} from './services/user.service.client';
import {ProductService} from './services/product.service.client';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import {SharedService} from './services/shared.service.client';
import {AuthGuard} from './services/auth-guard.service';

@NgModule({
  // Declare components here
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    TodoComponent,
    TodoListComponent,
    TodoEditComponent,
    WebsiteListComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing
  ],
  // Client Side services here
  providers: [ TestService, TodoService, WebsiteService , UserService, ProductService, SharedService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
