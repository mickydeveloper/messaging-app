/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './directives/alert/alert.component';
import { ChatRoomComponent } from './components/home/chat-room/chat-room.component';
import { ChatRoomListComponent } from './components/home/chat-room-list/chat-room-list.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MEAN2RoutingModule } from './app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import { AlertService, AuthenticationService, UserService } from './services/index';

describe('App: MEAN2', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            FormsModule,
            HttpModule,
            MEAN2RoutingModule
        ],
        declarations: [
          AppComponent,
          LoginComponent,
          HomeComponent,
          RegisterComponent,
          AlertComponent,
          ChatRoomComponent,
          ChatRoomListComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        AlertService,
        AuthenticationService,
        UserService,
    ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
