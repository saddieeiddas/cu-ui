/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

import {Blueprint} from '../../lib/Blueprint';

export interface BlueprintListProps {
  blueprints: [Blueprint];
  selected: number;
  selectBlueprint: (id: number) => void;
}

export interface BlueprintListState {
}

class BlueprintList extends React.Component<BlueprintListProps, BlueprintListState> {

  constructor(props: BlueprintListProps) {
    super(props);
  }
  
  generateBlueprintItem = (bp: Blueprint) => {
    return (
      <li key={bp.id} 
          onClick={() => this.props.selectBlueprint(bp.id)}
          className={this.props.selected == bp.id ? 'active': ''}
      >
        <span><img src={bp.icon} /></span><span>{bp.name}</span>
      </li>
    )
  }

  render() {
    return (
      <div className='blueprints__list'>
        <ul>
          {this.props.blueprints.map(this.generateBlueprintItem)}
        </ul>
      </div>
    )
  }
}

export default BlueprintList;
