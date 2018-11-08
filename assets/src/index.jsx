import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter.jsx';
import { Provider } from 'mobx-react';

import stores from './stores';

const App = () => (
  <Provider {...stores}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));