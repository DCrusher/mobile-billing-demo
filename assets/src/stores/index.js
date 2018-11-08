import AuthStore from './AuthStore';
import OperatorsStore from './OperatorsStore';
import PaymentsStore from './PaymentsStore';

const stores = {
  auth: AuthStore,
  operators: OperatorsStore,
  payments: PaymentsStore
};

export default stores;