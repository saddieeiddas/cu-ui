/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

import {Material} from '../../lib/Material';

export interface MaterialSelectorProps {
  materials: [Material];
  selectMaterial: (id: number) => void;
}

export interface MaterialSelectorState {
}

class MaterialSelector extends React.Component<MaterialSelectorProps, MaterialSelectorState> {

  constructor(props: MaterialSelectorProps) {
    super(props);
  }
  
  generateMaterialIcon = (mat: Material) => {
    return (
      <img key={mat.id}
           src={`data:image/png;base64, ${mat.icon}`}
           onClick={() => this.props.selectMaterial(mat.id)} 
      />
    )
  }

  render() {
    return (
      <div className='material-and-shape__material-selector'>
        {this.props.materials.map(this.generateMaterialIcon)}
      </div>
    )
  }
}

export default MaterialSelector;
