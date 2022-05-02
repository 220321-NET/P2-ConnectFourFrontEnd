import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { player } from '../models/player';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Player: player = {
    PlayerID: -1,
    Email: '',
    Username: '',
    Password: '',
    Wins: -1,
    Losses: -1,
    Ties: -1
  }

  constructor(private api: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.api.getPlayer(this.Player.Username).subscribe((res) => {
      this.router.navigate(['home'])
    })
  }
}
