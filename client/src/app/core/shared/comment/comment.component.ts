// Decorators and Lifehooks
import { Component, TemplateRef, Input, OnInit, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// RXJS
import { Subscription } from 'rxjs';

// Services
import { CommentService } from '../../services/comment.service';

// Models
import { Comment } from '../../models/comment.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input('bookId') bookId: string;
  modalRef: BsModalRef;
  commentsGetSub$: Subscription;
  comments: Comment[];
  currentPage = 1;
  commentForm: FormGroup;
  isFromEdit: boolean;
  lastEditId: string;

  constructor(
    private commentService: CommentService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      'content': new FormControl('')
    });
    this.commentsGetSub$ = this.commentService
      .getComments(this.bookId, (this.currentPage - 1).toString())
      .subscribe((res) => {
        this.comments = res.data;
      });
  }

  ngOnDestroy(): void {
    this.commentsGetSub$.unsubscribe();
  }

  openModal(template: TemplateRef<any>, id?: string) {
    if (id) {
      let content = '';
      this.isFromEdit = true;
      this.lastEditId = id;
      for (const c of this.comments) {
        if (c._id === id) {
          content = c.content;
          break;
        }
      }

      this.commentForm.patchValue({ content: content });
    } else {
      this.isFromEdit = false;
    }

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'commentModal' })
    );
  }

  onSubmit() {
    if (this.isFromEdit) {
      console.log('should launch edit');
      console.log(this.lastEditId);
    } else {
      console.log('should launch create');
    }
  }

  get content() {
    return this.commentForm.get('content');
  }

}
