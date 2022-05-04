import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  username!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onHome(): void {
    console.log(this.username);
    this.router.navigate(['home', this.username]);
  }

  onLeader(): void {
    console.log(this.username);
    this.router.navigate(['leaderboard', this.username]);
  }

  onSettings(): void {
    console.log(this.username);
    this.router.navigate(['settings', this.username]);
  }

}
