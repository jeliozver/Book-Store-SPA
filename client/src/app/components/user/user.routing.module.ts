// Decorators
import { NgModule } from '@angular/core';

// Modules
import { RouterModule, Routes } from '@angular/router';

// Components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

// Guards
import { IsAnonymousGuard } from '../../core/guards/is-anonymous.guard';

const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    canActivate: [IsAnonymousGuard],
    component: RegisterComponent
  },
  {
    path: 'login',
    canActivate: [IsAnonymousGuard],
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
