import axios from 'axios';
import { observable, action } from 'mobx';
import keyMirror from 'key-mirror';
import { isEmpty } from 'lodash';

const STATES = keyMirror({
  init: null,
  requested: null,
  responded: null
})

export default class OperatorsStore {
  @observable list = [];
  @observable errors = [];
  @observable state = STATES.init;
  @observable selected = null;

  constructor() {
    
  }

  @action
  getOperators() {
    this.state = STATES.requested

    return new Promise((resolve, reject) => {
      // Artificial delay
      setTimeout(() => {
        axios
        .get('http://localhost:1337/api/v1/operators')
        .then((response) => {
          this.list = response.data;
          this.state = STATES.responded;

          resolve();
        })
        .catch((error) => {
          this.errors = error;
          this.state = STATES.responded;

          reject(error);
        });
      }, 1000)

    });
  }

  @action
  setSelected(operator) {
    this.selected = operator;
  }

  isResponded() {
    return this.state === STATES.responded
  }
}