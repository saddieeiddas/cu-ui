/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { client } from 'camelot-unchained';
import * as React from 'react';
import ToolTip from '../common/ToolTip';
import { store } from '../stores/Building';

export interface TypeIconProps {
  id: number;
  icon: string;     /* base64 image */
  type: string;
  shape: string;
  selected: boolean;
};
export interface TypeIconState {
};

class TypeIcon extends React.Component<TypeIconProps, TypeIconState> {
  public name: string = 'TypeIcon';

  constructor(props: TypeIconProps) {
    super(props);
  }

  onClick = (): void => {
    client.ChangeBlockType(this.props.id);
    store.dispatch({ type: 'SELECT_BLOCK', id: this.props.id } as any);
  }

  render() {
    const classes: string[] = [ 'block-icon', 'type-icon', this.props.selected ? 'selected' : undefined ];
    return (
      <div className={classes.join(' ')} onClick={this.onClick}>
        <img src={ "data:image/png;base64," + this.props.icon }/>
        <ToolTip
          id={this.props.id}
          type={this.props.type}
          shape={this.props.shape}
          icon={this.props.icon}/>
      </div>
    );
  }
}

export default TypeIcon;
