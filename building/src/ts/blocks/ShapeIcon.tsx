/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import ToolTip from '../common/ToolTip';
import { store } from '../stores/Building';

export interface ShapeIconProps {
  id: number;
  icon: string;     /* base64 image */
  shape: string;
  selected: boolean;
};
export interface ShapeIconState {
};

class ShapeIcon extends React.Component<ShapeIconProps, ShapeIconState> {
  public name: string = 'ShapeIcon';
  static contextTypes: any;

  constructor(props: ShapeIconProps) {
    super(props);
  }

  onClick = (): void => {
    store.dispatch({ type: 'SELECT_SHAPE', shape: this.props.shape } as any);
  }

  render() {
    const classes: string[] = [ 'block-icon', 'shape-icon', this.props.selected ? 'selected' : undefined ];
    return (
      <div className={classes.join(' ')} onClick={this.onClick}>
        <img src={ "data:image/png;base64," + this.props.icon }/>
        <ToolTip
          id={this.props.id}
          shape={this.props.shape}
          icon={this.props.icon}/>
      </div>
    );
  }
}

export default ShapeIcon;
