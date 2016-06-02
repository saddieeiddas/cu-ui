/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {connect} from 'react-redux';

import {GlobalState} from '../../services/session/reducer';
import {selectMaterial, MaterialsState} from '../../services/session/materials';
import {selectBlock, BlocksState} from '../../services/session/blocks';
import {Material} from '../../lib/Material';
import {Block} from '../../lib/Block';

import MaterialView from '../MaterialView';
import ShapesView from '../ShapesView';
import MaterialSelector from '../MaterialSelector';

function select(state: GlobalState): MaterialAndShapePaneProps {
  return {
    blocksState: state.blocks,
    materialsState: state.materials,
  }
}

export interface MaterialAndShapePaneProps {
  minimized?: boolean;
  dispatch?: (action: any) => void;
  blocksState?: BlocksState;
  materialsState?: MaterialsState;
}

export interface MaterialAndShapePaneState {
  showMatSelect: boolean;
}

class MaterialAndShapePane extends React.Component<MaterialAndShapePaneProps, MaterialAndShapePaneState> {

  constructor(props: MaterialAndShapePaneProps) {
    super(props);
    this.state = {showMatSelect: false};
  }
  
   showMatSelector = (show: boolean) => {
    this.setState({showMatSelect: show} as any);
  }

  render() {
    console.log(this.props);
    let matSelect : any = null;
    if (this.state.showMatSelect) {
      matSelect = (
        <MaterialSelector materials={this.props.materialsState.materials}
                          selectMaterial={(id: number) => {
                            this.props.dispatch(selectMaterial(id));
                            this.showMatSelector(false);
                          }} />
      )
    }
    
    let selectedMaterial = this.props.materialsState.materials.find((mat: Material) => mat.id === this.props.materialsState.selected);
    return (
      <div className='build-panel__material-and-shape'>
       {
         this.props.minimized ? null : (
           <header>
             <span>Material &amp; Shape</span>
             <span className='build-panel__material-and-shape__menu'>...</span>
           </header>
         )
       }
        
        <div className='content'>
          <MaterialView selectedMaterial={selectedMaterial}
                        onClick={() => this.showMatSelector(!this.state.showMatSelect)}
          />
          <ShapesView minimized={this.props.minimized} />
          {matSelect}
        </div>
      </div>
    )
  }
}

export default connect(select)(MaterialAndShapePane);
