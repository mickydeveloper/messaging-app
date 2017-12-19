import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './guards/auth.guard';
import { AlertService, AuthenticationService, UserService } from './services/index';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { MEAN2RoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './directives/alert/alert.component';
import { ChatRoomComponent } from './components/home/chat-room/chat-room.component';
import { ChatRoomListComponent } from './components/home/chat-room-list/chat-room-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AlertComponent,
    ChatRoomComponent,
    ChatRoomListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MEAN2RoutingModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
