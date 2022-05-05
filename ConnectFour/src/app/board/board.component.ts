import { NoopAnimationPlayer } from '@angular/animations';
import { Component, OnInit, Output } from '@angular/core';
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

  Player1: player = {
    PlayerID: 0,
    Email: '',
    Username: '',
    Password: '',
    Wins: 0,
    Losses: 0,
    Ties: 0
  }
  Player1color: string = 'red';

  Player2: player = {
    PlayerID: 0,
    Email: '',
    Username: '',
    Password: '',
    Wins: 0,
    Losses: 0,
    Ties: 0
  }
  Player2color: string = 'yellow';

  currentPlayer: number = -1;

  board: number[][] = [
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1]
  ]

  constructor(private router: ActivatedRoute, private api: HttpService) {
  }

  addPiece(column: number): void {
    for (let r = 0; r < this.board.length; r++) {
      if (this.board[r][column] != -1 && this.board[0][column] == -1) {
        if (r != 0) {
          this.board[r - 1][column] = this.currentPlayer;
          this.changeTurn()
          return;
        }
      }
      else if (r === this.board.length - 1 && this.board[0][column]) {
        this.board[r][column] = this.currentPlayer;
        this.changeTurn()
      }
    }
  }

  changeTurn(): void {
    if (this.currentPlayer === -1)
      this.currentPlayer = this.Player1.PlayerID
    else if (this.currentPlayer === this.Player1.PlayerID) {
      this.currentPlayer = this.Player2.PlayerID;
    }
    else {
      this.currentPlayer = this.Player1.PlayerID;
    }
  }

  getPlayerColor(playerid: number): string {
    if (playerid === this.Player1.PlayerID)
      return this.Player1color;
    else if (playerid === this.Player2.PlayerID)
      return this.Player2color;
    return 'white';
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.currentUser = params['username'];
      this.api.getPlayer(this.currentUser).subscribe((res) => {
        this.Player1 = res.body!;
      })
    })
  }

}
