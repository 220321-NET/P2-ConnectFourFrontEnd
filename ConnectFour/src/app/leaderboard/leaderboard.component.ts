import { Component, Input, OnInit } from '@angular/core';
import { RankingModalComponent } from '../ranking-modal/ranking-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { HttpService } from '../services/http.service';
import { player } from '../models/player';
import { ranking } from '../models/ranking';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  currentUser: string = '';

  modalRef: MdbModalRef<RankingModalComponent> | null = null;

  constructor(private router: ActivatedRoute, private modalService: MdbModalService, private api: HttpService) {
    this.router.params.subscribe(params => {
      this.currentUser = params['username'];
    })
  }

  opacity: string = "100%"
  players: player[] = []
  rankings: ranking[] = []
  sortedPlayers: player[] = []

  getPlayers() {
    this.api.getAllPlayers().subscribe((res: player[]) => {
      this.players = res;
    })
  }

  getAllPlayerRanks() {
    this.api.getAllRanks().subscribe((res: ranking[]) => {
      this.rankings = res;
      for (let i = 0; i < this.rankings.length; i++) {
        for (let j = 0; j < this.rankings.length; j++) {
          let tempRank: ranking;
          if (this.rankings[i].Rank < this.rankings[j].Rank) {
            tempRank = this.rankings[i]
            this.rankings[i] = this.rankings[j]
            this.rankings[j] = tempRank
          }
        }
      }

      for (let i = this.rankings.length - 1; i >= 0; i--) {
        for (let j = 0; j < this.players.length; j++) {
          if (this.rankings[i].PlayerID === this.players[j].PlayerID) {
            this.sortedPlayers.push(this.players[j])
          }
        }
      }
    })
  }

  openRankingModal(currPlayer: player) {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(RankingModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: { currPlayer }
    })
    this.modalRef.onClose.subscribe((message: any) => {
      this.opacity = message;
    });
  }

  playerRank(playerCheck: player) {
    for (let i = 0; i < this.rankings.length; i++) {
      if (playerCheck.PlayerID === this.rankings[i].PlayerID) {
        return this.rankings[i].Rank;
      }
    }
    return 0;
  }

  ngOnInit(): void {
    this.getPlayers();
    this.getAllPlayerRanks();
  }

}
