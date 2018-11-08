import AuthStore from './AuthStore'
import OperatorsStore from './OperatorsStore'

const stores = {
  auth: new AuthStore(),
  operators: new OperatorsStore()
}

export default stores 