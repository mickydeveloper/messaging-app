import { Component, OnInit } from '@angular/core';

import { Room } from './../../../models/room';
import './../../../rxjs-operators';
import { RoomService } from './../../../services/index';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.scss'],
  providers: [
    RoomService
  ]
})
export class ChatRoomListComponent implements OnInit {
  isSubmitted = false;
  model = new Room('');
  public rooms = [];

  constructor(
    private roomService: RoomService
  ) { }

  submitRoom() {
    this.isSubmitted = true;
    this.roomService.addRoom(this.model)
      .subscribe(
        messageMsg => {
          this.model = new Room('');
      });
  }

  getRooms() {
    this.roomService.getRooms()
      .subscribe(
      rooms => {
        this.rooms = rooms;
      },
    );
  }

  ngOnInit() {
    this.getRooms();
  }
}
