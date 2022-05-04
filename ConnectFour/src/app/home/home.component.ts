import { Component, OnInit } from '@angular/core';
import { player } from '../models/player';
import { Md5 } from 'ts-md5/dist/md5';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';

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

  currentUser: string = '';

  picSum: string = "";

  default: string = "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e";

  gravitar: string = "";

  constructor(private api: HttpService, private router: ActivatedRoute, private _md5: Md5) {
    this.router.params.subscribe(params => {
      this.api.getPlayer(params['username']).subscribe((res) => {
        this.Player = res.body!;
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
    this.currentUser = this.Player.Username;
  }

}