import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ResetpasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    ResetpasswordComponent
  ]
})
export class AuthModule { }
