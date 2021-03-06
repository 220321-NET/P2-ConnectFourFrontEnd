import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { BoardComponent } from './board/board.component';
import { MainComponent } from './main/main.component';
import { RankingModalComponent } from './ranking-modal/ranking-modal.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { ResetpasswordComponent } from './auth/components/resetpassword/resetpassword.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent
  },
  {
    path: 'board/:username',
    component: BoardComponent
  },
  {
    path: 'home/:username',
    component: HomeComponent
  },
  {
    path: 'leaderboard/:username',
    component: LeaderboardComponent
  },
  {
    path: 'settings/:username',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
