import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPlane from './components/LoginPlane';
import LoginPlaneWithUseReducer from './components/LoginPlaneWithUseReducer';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={LoginPlane} />
      <Route exact path='/reducer' component={LoginPlaneWithUseReducer} />
    </Switch>
  );
}

export default App;
