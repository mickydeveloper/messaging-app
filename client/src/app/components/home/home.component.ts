import { Component } from '@angular/core';
import { Room } from './../../models/room';
import './../../rxjs-operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentRoom = new Room('');
  loggedInUser = JSON.parse(JSON.parse(localStorage.getItem('currentUser'))["_body"])["username"];

  constructor(
  ) { }

  setCurrentChat(activeChat){
    this.currentRoom = activeChat;
  }
}
