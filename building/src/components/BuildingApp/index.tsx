/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {connect} from 'react-redux';

import ActionBar from '../../widgets/ActionBar';
import BuildingPanel from '../../widgets/BuildPanel';
import SelectionView from '../../widgets/SelectionView';

import {selectItem} from '../../services/session/selection';

// test building item for selection

import {BuildingItem, BuildingItemType} from '../../lib/BuildingItem';
var selectedItem = {
  type: BuildingItemType.Block,
  icon: 'images/cube.png',
  name: 'Arthurian Granite',
  description: 'Cube',
} as BuildingItem;


function select(state: any): any {
  return {
    selectedItem: state.selection.selectedItem,
  }
}

export interface BuildingAppProps {
  dispatch?: (action: any) => void;
  selectedItem?: BuildingItem;
}

export interface BuildingAppState {
}

class BuildingApp extends React.Component<BuildingAppProps, BuildingAppState> {

  public name = 'building-app';

  constructor(props: BuildingAppProps) {
    super(props);
  }
  
  componentWillMount() {
    this.props.dispatch(selectItem(selectedItem));
  }

  render() {
    return (
      <div className='building'>
      <ActionBar />
      <BuildingPanel />
      <SelectionView item={this.props.selectedItem} />  
    </div>
    )
  }
}

export default connect(select)(BuildingApp);
