import { Component } from '@angular/core';
import {ChatsBtnComponent} from '../chats-btn/chats-btn.component';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [
    ChatsBtnComponent,
    ReactiveFormsModule
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {

}
