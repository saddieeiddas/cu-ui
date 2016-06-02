/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

import {Material} from '../../lib/Material';

export interface MaterialViewProps {
  onClick: () => void;
  selectedMaterial: Material;
}

export interface MaterialViewState {
}

class MaterialView extends React.Component<MaterialViewProps, MaterialViewState> {

  constructor(props: MaterialViewProps) {
    super(props);
  }
  
  render() {
    return (
      <div className='material-view' onClick={() => this.props.onClick()}>
        <img src={`data:image/png;base64, ${this.props.selectedMaterial.icon}`} />
        <div className='icon-bg'>
          <svg className={`edit-icon`}
               viewBox='0 0 18 18'
               dangerouslySetInnerHTML={{__html: `<use xlink:href='images/cube-other-icons.svg#edit'></use>`}}>
          </svg>
        </div>
      </div>
    )
  }
}

export default MaterialView;
