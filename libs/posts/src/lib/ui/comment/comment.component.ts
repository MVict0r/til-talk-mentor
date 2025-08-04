import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AvatarCircleComponent } from 'libs/common-ui/src/lib/components';
import { CommentInterface } from 'libs/data-access/src';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<CommentInterface>();
}
