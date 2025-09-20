import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from '../../feature-chats-workspace';
import { ChatsService } from '@tt/data-access';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsPageComponent implements OnInit {
  #chatService = inject(ChatsService);

  ngOnInit() {
    this.#chatService.connectWs()
  }
}
