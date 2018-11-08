import axios from 'axios';
import { observable, action } from 'mobx';

export default class AuthStore {
  @observable jwt = {};
  @observable errors = [];

  constructor() {
    const jwtString = localStorage.getItem('jwt');

    if (jwtString) {
      try {
        this.jwt = JSON.parse(jwtString);
      } catch {   
        this.jwt = {}
        console.warn('Bad jwt format in the Local Storage');
      }
    }
  }

  @action
  login(credentials) {
    return new Promise((resolve, reject) => {
      axios
        .put('http://localhost:1337/api/v1/entrance/login', credentials)
        .then((response) => {
          const jwt = response.data;
          this.jwt = jwt;
          localStorage.setItem('jwt', JSON.stringify(jwt));

          resolve();
        })
        .catch((error) => {
          this.errors = error;
          
          reject(error);
        });
    });
  }

  @action
  logout() {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('jwt');
      resolve();
    })
  }
}