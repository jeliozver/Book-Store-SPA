// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Router
import { ActivatedRoute } from '@angular/router';

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

}
