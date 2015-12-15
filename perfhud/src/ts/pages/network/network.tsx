/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {client} from 'camelot-unchained';
import * as React from 'react';
import {PerfhudPage, PerfhudPageProps, PerfhudPageState} from './../../perhud/perfhud-page';

export class NetworkPage extends React.Component<NetworkPageProps, NetworkPageState> implements PerfhudPage {

  private tickInterval: number;

  constructor(props: NetworkPageProps) {
    super(props);
    this.state = this.buildState();
  }

  buildState(): NetworkPageState {
    const stats: NetworkPageStatistic[] = [];
    stats.push(new NetworkPageStatistic('latency (msec)', (client.netstats_lag || 0.000).toFixed(1), client.netstats_lag > 250));
    stats.push(new NetworkPageStatistic('time delta (msec)', (client.netstats_delay || 0.000).toFixed(1), Math.abs(client.netstats_delay) > 250));
    stats.push(new NetworkPageStatistic('tcp messages / s', (client.netstats_tcpMessages || 0.000).toFixed(1), false));
    stats.push(new NetworkPageStatistic('tcp bytes / s', (client.netstats_tcpBytes || 0.000).toFixed(1), false));
    stats.push(new NetworkPageStatistic('udp packets / s', (client.netstats_udpPackets || 0.000).toFixed(1), client.netstats_udpPackets == 0));
    stats.push(new NetworkPageStatistic('udp bytes / s', (client.netstats_udpBytes || 0.000).toFixed(1), false));
    stats.push(new NetworkPageStatistic('self updates / s', (client.netstats_selfUpdatesPerSec || 0.000).toFixed(1), client.netstats_selfUpdatesPerSec < 0.25));
    stats.push(new NetworkPageStatistic('syncs / s', (client.netstats_syncsPerSec || 0.000).toFixed(1), client.netstats_syncsPerSec > 0.0));
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
      <div className="network-page">
        <table>
          <tbody>
            {this.state.stats.map((stat: NetworkPageStatistic, i: number) => {
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

export interface NetworkPageProps extends PerfhudPageProps {
  tickInterval: number;
}

export interface NetworkPageState extends PerfhudPageState {
  stats: NetworkPageStatistic[];
}

export class NetworkPageStatistic {
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
