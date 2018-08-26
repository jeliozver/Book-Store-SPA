// Decorators and Lifehooks
import { Component, TemplateRef, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Services
import { CommentService } from '../../services/comment.service';
import { BsModalService } from 'ngx-bootstrap/modal';

// Models
import { Comment } from '../../models/comment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('bookId') bookId: string;
  @Input('isLogged') isLogged: boolean;
  @Input('isAdmin') isAdmin: boolean;
  @Input('userId') userId: string;
  commentForm: FormGroup;
  commentModalRef: BsModalRef;
  removeModalRef: BsModalRef;
  comments: Comment[] = [];
  isFromEdit: boolean;
  lastEditId: string;
  lastDeleteId: string;
  action: string;

  constructor(
    private commentService: CommentService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      'content': new FormControl('', Validators.required)
    });

    this.commentService
      .getComments(this.bookId, this.comments.length.toString())
      .subscribe((res) => {
        this.comments = res.data;
      });
  }

  openFormModal(template: TemplateRef<any>, id?: string): void {
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
      this.action = 'Edit';
      this.commentForm.patchValue({ content: content });
    } else {
      this.action = 'Create';
      this.isFromEdit = false;
      this.commentForm.patchValue({ content: '' });
    }

    this.commentModalRef = this.modalService.show(
      template,
      { class: 'myModal' }
    );
  }

  openRemoveModal(template: TemplateRef<any>, id: string): void {
    this.lastDeleteId = id;
    this.removeModalRef = this.modalService.show(
      template,
      { class: 'myModal modal-sm' }
    );
  }

  onSubmit(): void {
    if (this.isFromEdit) {
      this.modifyComment();
    } else {
      this.createComment();
    }
  }

  loadMoreComments(): void {
    this.commentService
      .getComments(this.bookId, this.comments.length.toString())
      .subscribe((res) => {
        if (res.data.length !== 0) {
          this.comments.splice(this.comments.length, 0, ...res.data);
        }
      });
  }

  createComment(): void {
    this.commentService
      .addComment(this.bookId, this.commentForm.value)
      .subscribe((res) => {
        this.comments.unshift(res.data);
      });

    this.commentForm.reset();
  }

  modifyComment(): void {
    const editedContent = this.commentForm.value.content;
    this.commentService
      .editComment(this.lastEditId, this.commentForm.value)
      .subscribe(() => {
        for (const c of this.comments) {
          if (c._id === this.lastEditId) {
            c.content = editedContent;
            break;
          }
        }
      });

    this.commentForm.reset();
  }

  removeComment(): void {
    this.removeModalRef.hide();
    const delId = this.lastDeleteId;
    this.commentService
      .deleteComment(this.lastDeleteId)
      .subscribe(() => {
        this.comments = this.comments.filter(c => c._id !== delId);
      });
  }

}
