import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { player } from '../models/player';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  currentUser: string = '';

  Player: player = {
    PlayerID: 0,
    Email: '',
    Username: '',
    Password: '',
    Wins: 0,
    Losses: 0,
    Ties: 0
  }

  board: number[][] = [[], [], [], [], [], [], []]

  constructor(private router: ActivatedRoute, private api: HttpService) {
    this.router.params.subscribe(params => {
      this.currentUser = params['username'];
      this.api.getPlayer(this.currentUser).subscribe((res) => {
        this.Player = res.body!;
      })
    })
  }

  addpiece(column: number): void {

    this.board[column].push(this.Player.PlayerID);
  }
  ngOnInit(): void {
  }

}
