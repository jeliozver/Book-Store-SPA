// Decorators
import { NgModule } from '@angular/core';

// Modules
import { RouterModule, Routes } from '@angular/router';

// Components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from '../../core/shared/cart/cart.component';
import { ReceiptsComponent } from './receipts/receipts.component';

// Guards
import { IsAnonymousGuard } from '../../core/guards/is-anonymous.guard';
import { IsAuthenticatedGuard } from '../../core/guards/is-authenticated.guard';

const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'profile/:username',
    canActivate: [IsAuthenticatedGuard],
    component: ProfileComponent
  },
  {
    path: 'purchaseHistory',
    canActivate: [IsAuthenticatedGuard],
    component: ReceiptsComponent
  },
  {
    path: 'cart',
    canActivate: [IsAuthenticatedGuard],
    component: CartComponent
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
