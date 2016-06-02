/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {connect} from 'react-redux';
var ReactSelect = require('react-select');

import {GlobalState} from '../../services/session/reducer';
import {selectBP, BlueprintsState} from '../../services/session/blueprints';
import {Blueprint} from '../../lib/Blueprint';

import BlueprintList from '../BlueprintList';

function select(state: GlobalState): BlueprintsPaneProps {
  return {
    blueprintsState: state.blueprints,
  }
}

export interface BlueprintsPaneProps {
  dispatch?: (action: any) => void;
  blueprintsState?: BlueprintsState;
  minimized?: boolean;
}

export interface BlueprintsPaneState {
  filter?: any;
}

class BlueprintsPane extends React.Component<BlueprintsPaneProps, BlueprintsPaneState> {

  constructor(props: BlueprintsPaneProps) {
    super(props);
    this.state = {filter: null}
  }
  
  onFilterChanged = (val: any) => {
    console.log(val);
    this.setState({filter: val} as any);
  }

  render() {
    let options = this.props.blueprintsState.blueprints.map((bp: Blueprint) => {
      return {value: bp.id + '', label: bp.name}
    });
    
    return (
      <div className='BlueprintsPane'>
        <div className='BlueprintsPane__filter'>
          <div className='BlueprintsPane__filter__select'>
            <ReactSelect name='form-field-name'
                    placeholder='filter...'
                    value={this.state.filter}
                    options={options}
                    onChange={this.onFilterChanged}
                    multi
                    simpleValue
            />
          </div>
        </div>
        <BlueprintList blueprints={this.props.blueprintsState.blueprints}
                       selected={this.props.blueprintsState.selected}
                       selectBlueprint={(id: number) => this.props.dispatch(selectBP(id))}
        />
        <button>Save</button>
        <button>Delete</button>
      </div>
    )
  }
}

export default connect(select)(BlueprintsPane);

