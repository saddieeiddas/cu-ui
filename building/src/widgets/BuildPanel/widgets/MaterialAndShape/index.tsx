/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {BuildPaneProps} from '../../lib/BuildPane';

import MaterialView from './components/MaterialView';
import ShapesView from './components/ShapesView';

export interface MaterialAndShapeState {
}

class MaterialAndShape extends React.Component<BuildPaneProps, MaterialAndShapeState> {

  constructor(props: BuildPaneProps) {
    super(props);
  }

  render() {
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
          <MaterialView />
          <ShapesView minimized={this.props.minimized} />
        </div>
      </div>
    )
  }
}

export default MaterialAndShape;
