import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'https://andaluciadescubre.usuariozombie.com/api/towns';

  constructor(private http: HttpClient) { }

  getEvents(townId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${townId}/events`);
  }

  addEvent(townId: number, event: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${townId}/events`, event);
  }

  deleteEvent(townId: number, eventId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${townId}/events/${eventId}`);
  }
}
