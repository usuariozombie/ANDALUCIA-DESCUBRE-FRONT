import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DishService {
    private baseUrl = 'https://andaluciadescubre.usuariozombie.com/api/towns';

    constructor(private http: HttpClient) { }

    getDishes(townId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/${townId}/dishes`);
    }

    addDish(townId: number, dishData: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${townId}/dishes`, dishData);
    }

    deleteDish(townId: number, dishId: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${townId}/dishes/${dishId}`);
    }
}
