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
    this.api.addPlayer(this.Player).subscribe((res) => {
      this.router.navigate(['home'])
    })
  }
}
