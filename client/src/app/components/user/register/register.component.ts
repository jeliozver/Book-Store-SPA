// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Forms
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { mustMatchValidator } from '../../../core/directives/must-match.directive';

// Router
import { Router } from '@angular/router';

// Services
import { UserService } from '../../../core/services/user.service';

const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required
      ]),
      'avatar': new FormControl(''),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(16)
      ]),
      'confirmPassword': new FormControl(''),
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern(emailRegex)
      ])
    }, { validators: mustMatchValidator });
  }

  onSubmit(): void {
    this.userService
      .register(this.registerForm.value)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

  get username(): AbstractControl {
    return this.registerForm.get('username');
  }

  get avatar(): AbstractControl {
    return this.registerForm.get('avatar');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.registerForm.get('confirmPassword');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

}
