import { Component, Input, OnInit } from '@angular/core';
import { RankingModalComponent } from '../ranking-modal/ranking-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { HttpService } from '../services/http.service';
import { player } from '../models/player';
import { ranking } from '../models/ranking';
import { ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

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
  sortedImages: string[] = []

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
            this.sortedPlayers.push(this.players[j]);
          }
        }
      }

      for (let i = 0; i < this.sortedPlayers.length; i++) {
        this.getImages(this.players[i].Email, this.players[i].PlayerID);
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

  getImages(email: string, id: number): void {
    let hash = Md5.hashStr(email);
    this.api.getGravitar(hash).subscribe({
      'error': (err) => {
        if (err.status === 200) {
          this.sortedImages.push(err.url);
        }
        else {
          this.sortedImages.push(`https://picsum.photos/id/${id}/300`);
        }
      }
    });
  }

}
