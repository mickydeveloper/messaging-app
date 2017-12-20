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
export class ChatRoomComponent{
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  roomName = 'Select chat room';
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
    this.messages.push(this.model);
    this.messageService.addMessage(this.model)
      .subscribe(
      messageMsg => {
        this.model = new Message('', '', '');
      });
  }

  getMessages() {
    console.log('Subscribe to service');
    this.messageService.getMessagesByRoomName(this.roomName)
      .subscribe(
      messages => {
        // console.log("Messages:",messages);
        this.messages = messages;
      },
    );
  }

  ngOnChanges() {
    if (this.currentRoom.roomName !== '') {
      this.roomName = this.currentRoom.roomName;
      this.getMessages();
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
