/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {client} from 'camelot-unchained';
import * as React from 'react';
import {PerfhudPage, PerfhudPageProps, PerfhudPageState} from './../../perhud/perfhud-page';

export class PhysicsPage extends React.Component<PhysicsPageProps, PhysicsPageState> implements PerfhudPage {

  private tickInterval: number;

  constructor(props: PhysicsPageProps) {
    super(props);
    this.state = this.buildState();
  }

  buildState(): PhysicsPageState {
    const stats: PhysicsPageStatistic[] = [];
    stats.push(new PhysicsPageStatistic('position', '(' + (client.locationX || 0.000).toFixed(1) + ', ' + (client.locationY || 0.0).toFixed(1) + ', ' + (client.locationZ || 0.0).toFixed(1) + ')', false));
    stats.push(new PhysicsPageStatistic('serverPosition', '(' + (client.serverLocationX || 0.0).toFixed(1) + ', ' + (client.serverLocationY || 0.0).toFixed(1) + ', ' + (client.serverLocationZ || 0.0).toFixed(1) + ')', false));
    stats.push(new PhysicsPageStatistic('horizontalVel', (client.horizontalSpeed || 0.000).toFixed(1) + ' m/s @ ' + (client.velFacing || 0).toFixed(0) + '&#176;', false));
    stats.push(new PhysicsPageStatistic('downAngle', (client.downCollisionAngle || 0.000).toFixed(1) + '&#176;', false));
    return {
      stats: stats
    };
  }

  tick() {
    this.setState(this.buildState());
  }

  componentWillMount() {
    this.tickInterval = setInterval(this.tick.bind(this), this.props.tickInterval);
  }

  componentWillUnmount() {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
    }
  }

  render() {
    return (
      <div className="physics-page">
        <table>
          <tbody>
            {this.state.stats.map((stat: PhysicsPageStatistic, i: number) => {
              return (
                <tr key={i}>
                  <td>{stat.label}</td>
                  <td className={stat.errorClass() } dangerouslySetInnerHTML={{ __html: stat.value }}></td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

export interface PhysicsPageProps extends PerfhudPageProps {
  tickInterval: number;
}

export interface PhysicsPageState extends PerfhudPageState {
  stats: PhysicsPageStatistic[];
}

export class PhysicsPageStatistic {
  public label: string;
  public value: any;
  public error: boolean;

  constructor(label: string, value: any, error: boolean) {
    this.label = label;
    this.value = value;
    this.error = error;
  }

  public errorClass(): string {
    return this.error ? 'error' : '';
  }
}
