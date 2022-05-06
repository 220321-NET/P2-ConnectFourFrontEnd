import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { player } from '../models/player';
import { ranking } from '../models/ranking';
import { lobby } from '../models/lobby';
import { board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGravitar(hash: string): Observable<HttpResponse<any>> {
    return this.http.get<string>(`https://www.gravatar.com/avatar/${hash}?d=404`, {
      'observe': 'response'
    });
  }

  getPlayer(username: string): Observable<HttpResponse<player>> {
    return this.http.get<player>(`https://connectfourapi.azurewebsites.net/Player/GetPlayer/${username}`, {
      'observe': 'response'
    });
  }

  getPlayerbyId(playerid: number): Observable<HttpResponse<player>> {
    return this.http.get<player>(`https://connectfourapi.azurewebsites.net/Player/GetPlayerbyId/${playerid}`, {
      'observe': 'response'
    });
  }

  addPlayer(p: Partial<player>): Observable<any> {
    return this.http.post('https://connectfourapi.azurewebsites.net/Player/AddPlayer', p);

  }

  getAllPlayers(): Observable<any> {
    return this.http.get<player>('https://connectfourapi.azurewebsites.net/Player/GetAllPlayers');
  }

  getAllRanks(): Observable<any> {
    return this.http.get<ranking>('https://connectfourapi.azurewebsites.net/api/Ranking/GetAllPlayerRanks');
  }

  addLobby(l: Partial<lobby>): Observable<lobby> {
    return this.http.post<lobby>('https://connectfourapi.azurewebsites.net/api/Lobby', l);
  }

  getLobby(lobbyid: number): Observable<lobby> {
    return this.http.get<lobby>(`https://connectfourapi.azurewebsites.net/api/Lobby/${lobbyid}`);
  }

  addBoard(b: Partial<board>): Observable<board> {
    return this.http.post<board>('https://connectfourapi.azurewebsites.net/api/Board', b);
  }

  updateBoard(b: Partial<board>): void {
    this.http.put('https://connectfourapi.azurewebsites.net/api/Board', b);
  }
}
