import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RankingModalComponent } from './ranking-modal/ranking-modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BoardComponent } from './board/board.component';
import { PieceComponent } from './piece/piece.component';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { WinnerComponent } from './winner/winner.component';
import { InGameLoginComponent } from './in-game-login/in-game-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    RankingModalComponent,
    HomeComponent,
    NavbarComponent,
    MainComponent,
    SettingsComponent,
    BoardComponent,
    PieceComponent,
    WinnerComponent,
    InGameLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbModalModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
