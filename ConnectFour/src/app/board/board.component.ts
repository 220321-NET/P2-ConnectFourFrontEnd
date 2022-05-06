import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { InGameLoginComponent } from '../in-game-login/in-game-login.component';
import { board } from '../models/board';
import { lobby } from '../models/lobby';
import { player } from '../models/player';
import { HttpService } from '../services/http.service';
import { WinnerComponent } from '../winner/winner.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  modalRef: MdbModalRef<WinnerComponent> | null = null;

  currentUser: string = '';

  Player1: player = {
    PlayerID: -10,
    Email: '',
    Username: '',
    Password: '',
    Wins: 0,
    Losses: 0,
    Ties: 0
  }
  Player1color: string = 'red';

  Player2: player = {
    PlayerID: -10,
    Email: '',
    Username: '',
    Password: '',
    Wins: 0,
    Losses: 0,
    Ties: 0
  }
  Player2color: string = 'yellow';

  Lobby: lobby = {
    LobbyID: 0,
    Player1ID: 0,
    Player2ID: 0
  }

  Board: board = {
    BoardID: 0,
    PlayerID: -5,
    LobbyID: 0
  }

  opacity: string = '100%';
  currentPlayer: number = -1;
  winner: number = -1;
  winnerName: string = '';

  board: number[][] = [
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1]
  ]

  constructor(private route: Router, private router: ActivatedRoute, private api: HttpService, private modalService: MdbModalService) {
  }

  checkifFullBoard(): boolean {
    let count = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] != -1)
          count++;
      }
    }
    if (count != 42)
      return false;
    else
      return true;
  }

  addPiece(column: number): void {
    this.changeTurn();
    if (this.winner == -1) {
      for (let r = 0; r < this.board.length; r++) {
        if (this.board[r][column] != -1 && this.board[0][column] == -1) {
          if (r != 0) {
            // this.changeTurn()
            this.board[r - 1][column] = this.currentPlayer;
            this.winner = this.checkWin();
            if (this.winner != -1) {
              this.displayWinner(this.winnerName);
            } else if (this.checkifFullBoard()) {
              console.log("tie");
              this.getWinnerName(this.currentPlayer);
              this.displayWinner(this.winnerName);
            }
            return;
          }
        }
        else if (r === this.board.length - 1 && this.board[0][column] == -1) {
          // this.changeTurn()
          this.board[r][column] = this.currentPlayer;
          this.winner = this.checkWin();
          if (this.winner != -1) {
            this.displayWinner(this.winnerName);
          } else if (this.checkifFullBoard()) {
            console.log("tie");
            this.getWinnerName(this.currentPlayer);
            this.displayWinner(this.winnerName);
          }
        }
      }
    } else {
      this.displayWinner(this.winnerName);
    }
  }

  displayWinner(winnerName: string): void {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(WinnerComponent, {
      modalClass: 'modal-dialog-centered',
      data: { winnerName }
    })
    this.modalRef.onClose.subscribe((message: any) => {
      this.opacity = message;
      this.route.navigate(['home', this.currentUser]);
    });
  }

  displayPlayer2Login(): void {
    this.opacity = "25%";
    this.modalRef = this.modalService.open(InGameLoginComponent, {
      modalClass: 'modal-dialog-centered'
    })
    this.modalRef.onClose.subscribe((message: any) => {
      this.Player2 = message;
      this.opacity = "100%";
      this.addLobbytoDB();
    })

  }

  addLobbytoDB(): void {
    this.Lobby.Player1ID = this.Player1.PlayerID;
    this.Lobby.Player2ID = this.Player2.PlayerID;
    this.api.addLobby(this.Lobby).subscribe((res) => {
      this.Lobby = res;
      this.addBoardtoDB(res.LobbyID);
    })
  }

  addBoardtoDB(lobbyid: number): void {
    this.Board.LobbyID = lobbyid;
    this.api.addBoard(this.Board).subscribe((res) => {
      this.Board = res;
    })
  }

  updatePlayerstoDB(): void {
    this.api.updatePlayer(this.Player1).subscribe();
    this.api.updatePlayer(this.Player2).subscribe();
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

  getWinnerName(winner: number): void {
    this.Board.PlayerID = winner;
    this.api.updateBoard(this.Board).subscribe();
    if (winner === this.Player1.PlayerID) {
      this.winnerName = this.Player1.Username;
      this.Player1.Wins = this.Player1.Wins + 1;
      this.Player2.Losses = this.Player2.Losses + 1;
    }
    else if (winner === this.Player2.PlayerID) {
      this.winnerName = this.Player2.Username;
      this.Player2.Wins = this.Player2.Wins + 1;
      this.Player1.Losses = this.Player1.Losses + 1;
    } else {
      this.Player1.Ties = this.Player1.Ties + 1;
      this.Player2.Ties = this.Player2.Ties + 1;
    }
    this.updatePlayerstoDB();
  }

  checkWin(): number {
    let count = 0;

    // CHECK HORIZONTAL
    for (let row = this.board.length - 1; row >= 0; row--) {
      for (let col = 0; col < this.board[row].length - 3; col++) {
        if (this.board[row][col] === this.currentPlayer) {
          count = 0;
          for (let i = 0; i < 4; i++) {
            if (this.board[row][col] !== this.board[row][col + i])
              break;
            else {
              count++;
            }
          }
          if (count == 4) { this.getWinnerName(this.currentPlayer); return this.currentPlayer; }
        }
      }
    }

    // CHECK VERTICAL
    for (let row = this.board.length - 1; row >= 3; row--) {
      for (let col = 0; col < this.board[1].length; col++) {
        if (this.board[row][col] === this.currentPlayer) {
          count = 0;

          for (let i = 0; i < 4; i++) {
            if (this.board[row][col] !== this.board[row - i][col])
              break;
            else { count++; }
          }
          if (count == 4) { this.getWinnerName(this.currentPlayer); return this.currentPlayer; }
        }
      }
    }

    // CHECK FORWARD DIAGONAL
    for (let row = this.board.length - 1; row >= 3; row--) {
      for (let col = 0; col < this.board[row].length - 3; col++) {
        if (this.board[row][col] === this.currentPlayer) {
          count = 0;

          for (let i = 0; i < 4; i++) {
            if (this.board[row][col] !== this.board[row - i][col + i])
              break;
            else { count++; }
          }
          if (count == 4) { this.getWinnerName(this.currentPlayer); return this.currentPlayer; }
        }
      }
    }

    // CHECK BACKWARD DIAGONAL
    for (let row = this.board.length - 1; row >= 3; row--) {
      for (let col = 3; col < this.board[1].length; col++) {
        if (this.board[row][col] === this.currentPlayer) {
          count = 0;

          for (let i = 0; i < 4; i++) {
            if (this.board[row][col] !== this.board[row - i][col - i])
              break;
            else { count++; }
          }
          if (count == 4) { this.getWinnerName(this.currentPlayer); return this.currentPlayer; }
        }
      }
    }

    return -1;
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.currentUser = params['username'];
      this.api.getPlayer(this.currentUser).subscribe((res) => {
        this.Player1 = res.body!;
      })
    })
    this.displayPlayer2Login();
  }

}
