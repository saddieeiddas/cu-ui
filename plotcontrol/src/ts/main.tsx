/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import * as ReactDom from 'react-dom';
import {client, events, plotPermissions, restAPI} from 'camelot-unchained';


interface PlotControlUIState {
  plotOwned: boolean;
  currentPermissions: number;
  charID: string;
  entityID: string;

}
interface PlotControlUIProps {}

class PlotControlUI extends React.Component<PlotControlUIProps, PlotControlUIState> {
  constructor(props: PlotControlUIProps) {
    super(props);
  }

  closeWindow = () => {
    client.CloseUI('plotcontrol');
  }

  onPlotStatus = (eventData: any) => {
    this.setState({plotOwned: eventData.plotOwned, currentPermissions: eventData.permissions, charID: eventData.charID, entityID: eventData.entityID});
  }

  componentWillMount() {
    events.on(events.handlesPlot.topic, this.onPlotStatus);
    this.setState({
      plotOwned: false,
      currentPermissions: 0,
      charID: "",
      entityID: ""
    });
  }

  componentWillUnmount() {
    events.off(events.handlesPlot.topic);
  }

  changePermissions = (perm: plotPermissions) => {
    restAPI.postPlotPermissions({characterID: this.state.charID, loginToken: client.loginToken, entityID: this.state.entityID, newPermissions: perm});
  }
  
  releasePlot = () => {
      restAPI.postReleasePlot({characterID: this.state.charID, loginToken: client.loginToken, entityID: this.state.entityID});
  }

  // Render the unit frame using character data-perm
  render() {
    let body: any;
    if (this.state.plotOwned === true) {
      let permString = "Current Permissions: ";
      let prevPermission = false;
      if (this.state.currentPermissions == plotPermissions.Self) {
        permString += "Self Only";
      }
      else
      {
        if ((this.state.currentPermissions & plotPermissions.Group) == plotPermissions.Group) {
          permString += "Group"
          prevPermission = true;
        }
        if ((this.state.currentPermissions & plotPermissions.Friends) == plotPermissions.Friends) {
          if (prevPermission) permString += ", ";
          permString += "Friends";
          prevPermission = true;
        }
        if ((this.state.currentPermissions & plotPermissions.Guild) == plotPermissions.Guild) {
          if (prevPermission) permString += ", ";
          permString += "Guild";
          prevPermission = true;
        }
        if ((this.state.currentPermissions & plotPermissions.Realm) == plotPermissions.Realm) {
          if (prevPermission) permString += ", ";
          permString += "Realm";
          prevPermission = true;
        }
        if ((this.state.currentPermissions & plotPermissions.All) == plotPermissions.All) {
          if (prevPermission) permString += ", ";
          permString += "All";
          prevPermission = true;
        }
      }

      permString += ".";
      body = (
        <div className="cu-window-content">
          <ul className="permissionbutton-list">
            <li>{permString}</li>
            <button className="permButton" onMouseDown={this.changePermissions.bind(this, plotPermissions.Self)}>Self Only</button>
            <button className="permButton" onMouseDown={this.changePermissions.bind(this, plotPermissions.Group)}>Group</button>
            <button className="permButton" onMouseDown={this.changePermissions.bind(this, plotPermissions.Friends)}>Friends</button>
            <button className="permButton" onMouseDown={this.changePermissions.bind(this, plotPermissions.Guild)}>Guild</button>
            <button className="permButton" onMouseDown={this.changePermissions.bind(this, plotPermissions.Realm)}>Realm</button>
            <button className="permButton" onMouseDown={this.changePermissions.bind(this, plotPermissions.All)}>All</button>
            <button className="permButton" onMouseDown={this.releasePlot.bind(this)}>Release Plot</button>
          </ul>
        </div>
      );
    }
    else
    {
      body = (<div className="cu-window-content">You don't own a plot!</div>);
    }

    return (
      <div className="cu-window">
        <div className="cu-window-header">
          <div className="cu-window-title">Your Plot</div>
          <div className="cu-window-actions">
            <a onMouseDown={this.closeWindow.bind(this)} className="cu-window-close"></a>
          </div>
        </div>
        {body}
      </div>
    );
  }
}

events.on('init', () => {
  ReactDom.render(<PlotControlUI/>, document.getElementById("cse-ui-plotcontrol"));
});
