import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {

  winnerName!: string;

  constructor(public modalRef: MdbModalRef<WinnerComponent>) { }

  ngOnInit(): void {
  }

  close() {
    const opacity = "100%";
    this.modalRef.close(opacity);
  }

}