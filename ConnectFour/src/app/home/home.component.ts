import { Component, Input, OnInit } from '@angular/core';
import { player } from '../models/player';
import { Md5 } from 'ts-md5/dist/md5';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Md5]
})
export class HomeComponent implements OnInit {

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

  constructor(private api: HttpService, private route: ActivatedRoute, private _md5: Md5) {
    this.route.params.subscribe(params => {
      this.api.getPlayer(params['username']).subscribe((res: player) => {
        this.Player = res;
        this.getImages();
      })
    })
  }

  ngOnInit(): void {
  }

  getImages(): void {
    let hash = Md5.hashStr(this.Player.Email);
    this.gravitar = `https://www.gravatar.com/avatar/${hash}`;
    this.picSum = `https://picsum.photos/id/${this.Player.PlayerID}/300`;
  }

}