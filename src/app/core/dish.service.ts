import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';

@Injectable({
    providedIn: 'root'
})
export class DishService {
    private baseUrl = environment.baseUrl + '/api/towns';

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
