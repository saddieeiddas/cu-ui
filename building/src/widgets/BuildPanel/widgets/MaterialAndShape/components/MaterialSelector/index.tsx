/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

export interface MaterialSelectorProps {
}

export interface MaterialSelectorState {
}

class MaterialSelector extends React.Component<MaterialSelectorProps, MaterialSelectorState> {

  constructor(props: MaterialSelectorProps) {
    super(props);
  }

  render() {
    return (
      <div className='material-and-shape__material-selector'>
        
      </div>
    )
  }
}

export default MaterialSelector;
