import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { player } from 'src/app/models/player';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Player: player = {
    PlayerID: 0,
    Email: '',
    Username: '',
    Password: '',
    Wins: 0,
    Losses: 0,
    Ties: 0
  }

  constructor(private api: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.api.getPlayer(this.Player.Username).subscribe((res) => {
      this.router.navigate(['home'])
    })
  }

}
