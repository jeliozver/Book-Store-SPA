// Decorators and Lifehooks
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

// RXJS
import { Subscription } from 'rxjs';

// Services
import { CommentService } from '../../services/comment.service';

// Models
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input('bookId') bookId: string;
  commentsGetSub$: Subscription;
  comments: Comment[];
  currentPage = 1;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.commentsGetSub$ = this.commentService
      .getComments(this.bookId, (this.currentPage - 1).toString())
      .subscribe((res) => {
        this.comments = res.data;
      });
  }

  ngOnDestroy(): void {
    this.commentsGetSub$.unsubscribe();
  }

}
