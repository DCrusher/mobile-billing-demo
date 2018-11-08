import axios from 'axios';
import { observable, action } from 'mobx';
import AuthStore from './AuthStore';
import keyMirror from 'key-mirror';

const STATES = keyMirror({
  init: null,
  requested: null,
  responded: null
})


 class PaymentsStore {
  @observable payment = {};
  @observable error = null;
  @observable state = STATES.init;

  @action
  makePayment(payload) {
    this.state = STATES.requested

    return new Promise((resolve, reject) => {
      axios.post(
        'http://localhost:1337/api/v1/payments', 
        payload,
        { headers: {'Authorization' : `Bearer ${AuthStore.jwt.token}`} }
      )
      .then((response) => {
        const payment = response.data;
        this.payment = payment;
        this.state = STATES.responded;

        resolve(payment);
      })
      .catch((error) => {
        this.error = error;
        this.state = STATES.responded;

        reject(error);
      });
    })
  }

  isResponded() {
    return this.state === STATES.responded;
  }
}

export default new PaymentsStore;