/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {client, events} from 'camelot-unchained';

export interface BuildingToggleProps {
};

export interface BuildingToggleState {
  buildingIsActive: boolean;
};

export class BuildingToggle extends React.Component<BuildingToggleProps, BuildingToggleState> {
  constructor(props: BuildingToggleProps) {
    super(props);
    this.state = {
      buildingIsActive: false
    }
  }

  componentWillMount() {
    this.setState({
      buildingIsActive: false
    });
  }

  toggleBuilding = (): void => {
    this.setState({ buildingIsActive: !this.state.buildingIsActive } as any);
    client.ToggleBuildingMode();
  }

  render() {
    let buildClassName: string = this.state.buildingIsActive ? 'button-active' : 'button-inactive';
    return (
      <div>
        <div id='building-button' onClick={this.toggleBuilding.bind(this, this) }>
          <img className={buildClassName} src='../../interface/images/skillbar/active-frame.gif' />
        </div>
      </div>
    );
  }
}
