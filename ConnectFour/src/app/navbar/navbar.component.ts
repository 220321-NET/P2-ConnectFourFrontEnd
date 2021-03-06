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
    this.router.navigate(['home', this.username]);
  }

  onLeader(): void {
    this.router.navigate(['leaderboard', this.username]);
  }

  onSettings(): void {
    this.router.navigate(['settings', this.username]);
  }

}
