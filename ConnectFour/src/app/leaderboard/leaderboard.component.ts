import { Component, Input, OnInit } from '@angular/core';
import { RankingModalComponent } from '../ranking-modal/ranking-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  modalRef: MdbModalRef<RankingModalComponent> | null = null;

  constructor(private modalService: MdbModalService) { }

  openRankingModal() {
    this.modalRef = this.modalService.open(RankingModalComponent, {
      modalClass: 'modal-dialog-centered'
    })
  }


}
