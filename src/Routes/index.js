import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './route';

import SignIn from '../pages/Signin';
import Orders from '../pages/Orders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/orders" component={Orders} isPrivate />
    </Switch>
  );
}
