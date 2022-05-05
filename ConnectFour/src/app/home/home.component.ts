import { Component, OnInit, Output } from '@angular/core';
import { player } from '../models/player';
import { Md5 } from 'ts-md5/dist/md5';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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

  constructor(private route: Router, private api: HttpService, private router: ActivatedRoute) {
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
    this.api.getGravitar(hash).subscribe({
      'error': (err) => {
        if (err.status === 200)
          this.gravitar = err.url;
      }
    });
    this.picSum = `https://picsum.photos/id/${this.Player.PlayerID}/300`;
    this.currentUser = this.Player.Username;
  }

  gotoBoard(): void {
    this.route.navigate(['board', this.currentUser]);
  }

}