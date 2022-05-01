import { Component, OnInit } from '@angular/core';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-ranking-modal',
  templateUrl: './ranking-modal.component.html',
  styleUrls: ['./ranking-modal.component.css']
})
export class RankingModalComponent {

  constructor(public modalRef: MdbModalRef<RankingModalComponent>) { }

}
