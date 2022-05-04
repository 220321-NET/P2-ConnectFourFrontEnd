import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { player } from 'src/app/models/player';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private psswrd: string = '';

  Player: player = {
    PlayerID: 0,
    Email: '',
    Username: '',
    Password: '',
    Wins: 0,
    Losses: 0,
    Ties: 0
  }

  errorMessage: string = '';

  constructor(private api: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.psswrd = this.Player.Password;
    this.api.getPlayer(this.Player.Username).subscribe({
      'next': (res) => {
        if (res.status === 200) {
          this.Player = res.body!;
          if (this.Player.Password === this.psswrd)
            this.router.navigate(['home', this.Player.Username]);
          else
            this.errorMessage = "Incorrect password!";
        }
        if (res.status === 204) {
          this.errorMessage = "User does not exist!";
        }
      },
      'error': (err) => {
        this.errorMessage = err.error;
      }
    });
  }
}
