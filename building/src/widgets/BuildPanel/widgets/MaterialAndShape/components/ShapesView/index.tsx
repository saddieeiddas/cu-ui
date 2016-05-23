/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

export interface ShapesViewProps {
  minimized: boolean;
}

export interface ShapesViewState {
}

class ShapesView extends React.Component<ShapesViewProps, ShapesViewState> {

  constructor(props: ShapesViewProps) {
    super(props);
  }

  render() {
    return (
      <div className={`shapes-view ${this.props.minimized ? 'minimized' : ''}`}>
        <img src='./images/cube.png' />
        <img src='./images/cube.png' />
        <img src='./images/cube.png' />
        <img src='./images/cube.png' />
        <img src='./images/cube.png' />
        <img src='./images/cube.png' />
      </div>
    )
  }
}

export default ShapesView;
