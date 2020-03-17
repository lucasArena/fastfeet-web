import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './route';

import SignIn from '../pages/Signin';
import Orders from '../pages/Orders';
import Deliveryguys from '../pages/Deliveryguys';
import Receiver from '../pages/Receiver';
import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/orders" component={Orders} isPrivate />
      <Route path="/deliveryguys" component={Deliveryguys} isPrivate />
      <Route path="/receiver" component={Receiver} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
