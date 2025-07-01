import {Component, EventEmitter, HostBinding, inject, input, Output, Renderer2} from '@angular/core';
import {AvatarCircleComponent} from "../avatar-circle/avatar-circle.component";
import {FormsModule} from "@angular/forms";
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {PostService} from '../../data/services/post.service';
import {ProfileInterface} from '../../data/interfaces/profile.interface';
import {firstValueFrom} from 'rxjs';
import {ProfileService} from '../../data/services/profile.service';

@Component({
  selector: 'app-message-input',
  standalone: true,
    imports: [
        AvatarCircleComponent,
        FormsModule,
        SvgIconComponent
    ],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {
  r2 = inject(Renderer2)
  me = inject(ProfileService).me

  @Output() created = new EventEmitter<string>()

  postText: string = ''

  onTextAreaInput(event: Event) {
    const textarea: HTMLTextAreaElement = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', `${textarea.scrollHeight}px`);
  }


  onSend(){
    if (this.postText.trim()){
      this.created.emit(this.postText);
      this.postText = '';
    }
  }

  onCreatePost() {
    if (!this.postText) return

    this.created.emit(this.postText)
    this.postText = ''
  }
}
