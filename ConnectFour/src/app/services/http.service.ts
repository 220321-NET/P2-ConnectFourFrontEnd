import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { player } from '../models/player';
import { ranking } from '../models/ranking';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getPlayer(username: string): Observable<HttpResponse<player>> {
    return this.http.get<player>(`https://connectfourapi.azurewebsites.net/Player/GetPlayer/${username}`, {
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
}
