import axios from 'axios';
import { observable, action } from 'mobx';
// import stores from './index.js';
import AuthStore from './AuthStore';
import keyMirror from 'key-mirror';

const STATES = keyMirror({
  init: null,
  requested: null,
  responded: null
})

class OperatorsStore {
  @observable list = [];
  @observable errors = [];
  @observable state = STATES.init;
  @observable selected = null;

  @action
  getOperators() {
    this.state = STATES.requested

    return new Promise((resolve, reject) => {
      // Artificial delay
      setTimeout(() => {
        axios.get(
          'http://localhost:1337/api/v1/operators',
          { headers: {'Authorization' : `Bearer ${AuthStore.jwt.token}`} }
        )
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
  
  @action
  addPaymentToSelected(payment) {
    const selectedOperator = this.selected;
    if (payment.operator === selectedOperator.id) {
      this.selected = Object.assign(this.selected, {
        totalBalance: this.selected.totalBalance + payment.amount
      })
    }
  }

  isResponded() {
    return this.state === STATES.responded;
  }
}

export default new OperatorsStore();