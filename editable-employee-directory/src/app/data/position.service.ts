import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Position } from './position';

@Injectable()
export class PositionService {

  private url = "https://ywarda-teams-api.herokuapp.com";

  constructor(private http: HttpClient) {}

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.url}/positions`);
  }

  //savePosition(position: Position)
  savePosition(position : Position) : Observable<any>{
    return this.http.put<any>(`${this.url}/position/` + position._id, position);
  }

  //getPosition(id)
  getPosition(id : string) : Observable<Position[]>{
    return this.http.get<Position[]>(`${this.url}/position/`+ id);
  }
}
