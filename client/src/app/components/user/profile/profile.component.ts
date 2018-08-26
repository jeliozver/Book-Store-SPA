// Decorators and Lifehooks
import { Component, OnInit, OnDestroy } from '@angular/core';

// Router
import { ActivatedRoute } from '@angular/router';

// Forms
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

// Services
import { UserService } from '../../../core/services/user.service';
import { CommentService } from '../../../core/services/comment.service';
import { HelperService } from '../../../core/services/helper.service';

// RXJS
import { Subscription } from 'rxjs';

// Custom Validators
import { isUrlValidator } from '../../../core/directives/is-url.directive';

// Models
import { User } from '../../../core/models/user.model';
import { Comment } from '../../../core/models/comment.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  comments: Comment[];
  avatarForm: FormGroup;
  routeChangeSub$: Subscription;
  currentUserId: string;
  isAdmin: boolean;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private userService: UserService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.routeChangeSub$ = this.route.params.subscribe((params) => {
      let username = params['username'];
      if (username === 'mine') {
        username = this.helperService.getProfile().username;
      }

      this.userService
        .getProfile(username)
        .subscribe((res) => {
          this.user = res.data;
          this.getComments();
        });
    });

    this.isAdmin = this.helperService.isAdmin();
    this.currentUserId = this.helperService.getProfile().id;

    this.avatarForm = new FormGroup({
      'avatar': new FormControl('', [
        Validators.required,
        isUrlValidator
      ])
    });
  }

  ngOnDestroy(): void {
    this.routeChangeSub$.unsubscribe();
  }

  getComments(): void {
    this.commentService
      .getLatestFiveComments(this.user.id)
      .subscribe((res) => {
        this.comments = res.data;
      });
  }

  onSubmit(): void {
    this.changeUserAvatar();
  }

  changeUserAvatar(): void {
    const newAvatar = this.avatar.value;

    const payload = {
      id: this.user.id,
      avatar: newAvatar
    };

    this.userService
      .changeAvatar(payload)
      .subscribe(() => {
        this.user.avatar = newAvatar;
        this.avatarForm.reset();
      });
  }

  blockComments(id: string): void {
    this.userService
      .blockComments(id)
      .subscribe();
  }

  unblockComments(id: string): void {
    this.userService
      .unblockComments(id)
      .subscribe();
  }

  get avatar(): AbstractControl {
    return this.avatarForm.get('avatar');
  }

}
