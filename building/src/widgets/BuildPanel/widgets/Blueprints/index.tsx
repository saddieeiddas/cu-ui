/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
var thunk = require('redux-thunk').default;

import reducer from './services/session/reducer';
import BlueprintsPane from './components/BlueprintsPane';

let store = createStore(reducer, applyMiddleware(thunk));

let options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

export interface ContainerProps {
}

export interface ContainerState {
}

class Container extends React.Component<ContainerProps, ContainerState> {
  render() {
    return (
      <Provider store={store}>
        <BlueprintsPane />
      </Provider>
    )
  }
}

export default Container;
