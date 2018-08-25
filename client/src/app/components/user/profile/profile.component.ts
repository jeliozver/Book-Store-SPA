// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Router
import { ActivatedRoute } from '@angular/router';

// Forms
import { FormGroup, AbstractControl } from '@angular/forms';

// Services
import { UserService } from '../../../core/services/user.service';
import { HelperService } from '../../../core/services/helper.service';

// Models
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  avatarForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    let username = this.route.snapshot.paramMap.get('username');

    if (username === 'mine') {
      username = this.helperService.getProfile().username;
    }

    this.userService
      .getProfile(username)
      .subscribe((res) => {
        this.user = res.data;
        console.log(this.user);
      });
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
