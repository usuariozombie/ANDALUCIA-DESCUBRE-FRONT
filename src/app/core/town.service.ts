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
}
