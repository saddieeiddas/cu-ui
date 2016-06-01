/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
var Select = require('react-select');

import {Blueprint} from './lib/Blueprint';

let options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

export interface BlueprintsProps {
  minimized: boolean;
}

export interface BlueprintsState {
  filter: any;
}

class Blueprints extends React.Component<BlueprintsProps, BlueprintsState> {

  constructor(props: BlueprintsProps) {
    super(props);
    this.state = {filter: null}
  }
  
  onFilterChanged = (val: any) => {
    console.log(val);
    this.setState({filter: val} as any);
  }
  
  generateBlueprintItem = (bp: Blueprint) => {
    return (
      <li key={bp.id}>
        <span><img src={bp.icon} /></span><span>{bp.name}</span>
      </li>
    )
  }

  render() {
    return (
      <div className='blueprints'>
        <div className='blueprints__filter'>
          <div className='blueprints__filter__select'>
            <Select name='form-field-name'
                    placeholder='filter...'
                    value={this.state.filter}
                    options={options}
                    onChange={this.onFilterChanged}
                    multi
                    simpleValue
            />
          </div>
        </div>
        
        <div className='blueprints__list'>
          <ul>
            {this.}
          </ul>
        </div>
        
      </div>
    )
  }
}

export default Blueprints;
