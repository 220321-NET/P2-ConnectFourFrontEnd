import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { player } from '../models/player';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  passwordConfirm: string = '';

  newPlayer: player = {
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

  submitForm() {
    this.api.addPlayer(this.newPlayer).subscribe((res) => {
      this.router.navigate(['home'])
    })
  }
}
