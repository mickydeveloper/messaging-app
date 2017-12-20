import { Component, OnInit, Input, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';

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
export class ChatRoomComponent {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  roomName = 'Select chat room';
  visitedRooms = [];
  isSubmitted = false;
  model = new Message('', '', '');
  @Input() currentRoom = new Room('');
  loggedInUser = JSON.parse(JSON.parse(localStorage.getItem('currentUser'))["_body"])["username"];
  public messages = [];

  constructor(
    private messageService: MessageService
  ) { }

  submitMessage() {
    this.model.author = this.loggedInUser;
    this.model.roomName = this.roomName;
    this.messageService.addMessage(this.model)
      .subscribe(
      messageMsg => {
        this.model = new Message('', '', '');
      });
  }

  getMessages() {
    this.messageService.getMessagesByRoomName(this.roomName)
      .subscribe(
      messages => {
        this.messages = messages;
      },
    );
  }

  ngOnChanges() {
    if (this.currentRoom.roomName !== '') {
      this.roomName = this.currentRoom.roomName;
      this.getMessages();

      if (!(this.visitedRooms.indexOf(this.roomName) > -1)) {
        this.visitedRooms.push(this.roomName);
        this.messageService.enterRoom(this.roomName)
          .subscribe(
          message => {
            if (message) {
              this.messages.push(message);
            }
          },
        );
      }
    }
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
