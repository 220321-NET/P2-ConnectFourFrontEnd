import { Component, Input, OnInit } from '@angular/core';
import { player } from '../models/player';
import { HttpService } from '../services/http.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {

  @Input()
  pieceUser!: string;

  Player: player = {
    PlayerID: 0,
    Email: '',
    Username: '',
    Password: '',
    Wins: 0,
    Losses: 0,
    Ties: 0
  }

  picSum: string = "";

  default: string = "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e";

  gravitar: string = "";

  constructor(private api: HttpService) {
    console.log(this.pieceUser);
    this.api.getPlayer(this.pieceUser).subscribe((res) => {
      this.Player = res.body!;
      this.getImages();
    })
  }

  ngOnInit(): void {
  }

  getImages(): void {
    let hash = Md5.hashStr(this.Player.Email);
    this.gravitar = `https://www.gravatar.com/avatar/${hash}`;
    this.picSum = `https://picsum.photos/id/${this.Player.PlayerID}/300`;
    this.pieceUser = this.Player.Username;
  }

}
