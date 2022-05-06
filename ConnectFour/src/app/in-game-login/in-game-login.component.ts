import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { player } from '../models/player';
import { HttpService } from '../services/http.service';
import { WinnerComponent } from '../winner/winner.component';

@Component({
  selector: 'app-in-game-login',
  templateUrl: './in-game-login.component.html',
  styleUrls: ['./in-game-login.component.css']
})
export class InGameLoginComponent implements OnInit {

  player2Username!: string;
  player2!: player;

  constructor(private api: HttpService, public modalRef: MdbModalRef<WinnerComponent>) { }

  ngOnInit(): void {
  }

  submit() {
    this.api.getPlayer(this.player2Username).subscribe((res) => {
      this.player2 = res.body!;
      this.modalRef.close(this.player2);
    })
  }

}
