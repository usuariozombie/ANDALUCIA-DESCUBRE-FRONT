import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class TownService {
    constructor() { }

    async getTowns() {
        return fetch('https://andaluciadescubre.usuariozombie.com/api/towns')
            .then(response => response.json());
    }

    async getRandomTowns(count: number) {
        return fetch(`https://andaluciadescubre.usuariozombie.com/api/towns/random/${count}`)
            .then(response => response.json());
    }

    async getTown(id: number) {
        return fetch(`https://andaluciadescubre.usuariozombie.com/api/towns/${id}`)
            .then(response => response.json());
    }

    async updateTown(id: number, town: any) {
        return fetch(`https://andaluciadescubre.usuariozombie.com/api/towns/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(town)
        });
    }

    async createTown(town: any) {
        return fetch('https://andaluciadescubre.usuariozombie.com/api/towns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(town)
        }).then(response => response.json());
    }

    async deleteTown(id: number) {
        return fetch(`https://andaluciadescubre.usuariozombie.com/api/towns/${id}`, {
            method: 'DELETE'
        });
    }
}
