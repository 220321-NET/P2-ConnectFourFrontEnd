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
  pieceUser: string = '';

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

  gravitar: string = "";

  constructor(private api: HttpService) {
  }

  ngOnInit(): void {
    this.api.getPlayerbyId(Number(this.pieceUser)).subscribe((res) => {
      this.Player = res.body!;
      this.getImages();
    })
  }

  getImages(): void {
    let hash = Md5.hashStr(this.Player.Email);
    this.api.getGravitar(hash).subscribe({
      'error': (err) => {
        if (err.status === 200)
          this.gravitar = err.url;
      }
    });
    this.picSum = `https://picsum.photos/id/${this.Player.PlayerID}/300`;
  }

}
