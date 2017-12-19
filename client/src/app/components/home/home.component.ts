import { Component, OnInit } from '@angular/core';

import { Message } from './../../models/message';
import './../../rxjs-operators';
import { MessageService, AuthenticationService } from './../../services/index';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  isSubmitted = false;
  model = new Message('', '');
  loggedInUser = JSON.parse(JSON.parse(localStorage.getItem('currentUser'))["_body"])["username"];
  public messages = [];

  constructor(
    private messageService: MessageService,
    private authService: AuthenticationService
  ) { }

  submitMessage() {
    this.model.author = this.loggedInUser;
    this.messageService.addMessage(this.model)
      .subscribe(
        messageMsg => {
          this.model = new Message('', '');
      });
  }

  getMessages() {
    console.log('Subscribe to service');
    this.messageService.getMessages()
      .subscribe(
      messages => {
        // console.log("Messages:",messages);
        this.messages = messages;
      },
    );
  }

  ngOnInit() {
    this.getMessages();
  }
}
