import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { player } from '../models/player';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-ranking-modal',
  templateUrl: './ranking-modal.component.html',
  styleUrls: ['./ranking-modal.component.css']
})
export class RankingModalComponent {

  currPlayer!: player;

  constructor(public modalRef: MdbModalRef<RankingModalComponent>, private api: HttpService) { }

  close() {
    const opacity = "100%";
    this.modalRef.close(opacity)
  }
}
