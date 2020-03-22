import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './route';

import SignIn from '../pages/Signin';
import Orders from '../pages/Orders';
import OrdersForm from '../pages/Orders/Form';
import Deliveryguys from '../pages/Deliveryguys';
import DeliveryguysForm from '../pages/Deliveryguys/Form';
import Receiver from '../pages/Receiver';
import ReceiverForm from '../pages/Receiver/Form';
import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/orders/create" component={OrdersForm} isPrivate />
      <Route path="/orders/edit/:id" component={OrdersForm} isPrivate />

      <Route path="/deliveryguys" exact component={Deliveryguys} isPrivate />
      <Route
        path="/deliveryguys/create"
        component={DeliveryguysForm}
        isPrivate
      />
      <Route path="/deliveryguys/:id" component={DeliveryguysForm} isPrivate />

      <Route path="/receiver" exact component={Receiver} isPrivate />
      <Route path="/receiver/create" component={ReceiverForm} isPrivate />
      <Route path="/receiver/:id" component={ReceiverForm} isPrivate />

      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
