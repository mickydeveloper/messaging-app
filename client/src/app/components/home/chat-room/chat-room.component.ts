import { Component, OnInit } from '@angular/core';

import { Message } from './../../../models/message';
import { Room } from './../../../models/room';
import './../../../rxjs-operators';
import { MessageService } from './../../../services/index';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  providers: [
    MessageService
  ]
})
export class ChatRoomComponent implements OnInit {
  roomName = 'Chat Room Name';
  isSubmitted = false;
  model = new Message('', '', '');
  currentRoom = new Room('');
  loggedInUser = JSON.parse(JSON.parse(localStorage.getItem('currentUser'))["_body"])["username"];
  public messages = [];

  constructor(
    private messageService: MessageService
  ) { }

  submitMessage() {
    this.model.author = this.loggedInUser;
    this.messageService.addMessage(this.model)
      .subscribe(
        messageMsg => {
          this.model = new Message('', '', '');
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
