/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {client} from 'camelot-unchained';
import * as React from 'react';
import {PerfhudPage, PerfhudPageProps, PerfhudPageState} from './../../perhud/perfhud-page';
import PerfhudParser from './perfhud-parser';

export class RenderPage extends React.Component<RenderPageProps, RenderPageState> implements PerfhudPage {

  private tickInterval: number;

  private parser: PerfhudParser;

  constructor(props: RenderPageProps) {
    super(props);
    this.parser = new PerfhudParser();
    this.state = this.buildState();
  }

  buildState(): RenderPageState {
    this.parser.parse(client.perfHUD);
    return {
      parsedPerfhud: this.parser
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
      <div className="render-page">
        <div className="grid-header">{this.state.parsedPerfhud.average.header}</div>
        <div className="grid-container" dangerouslySetInnerHTML={this.state.parsedPerfhud.average.grid}></div>
        <div className="grid-footer">{this.state.parsedPerfhud.average.footer}</div>
        <div className="grid-header">{this.state.parsedPerfhud.longest.header}</div>
        <div className="grid-container" dangerouslySetInnerHTML={this.state.parsedPerfhud.longest.grid}></div>
        <div className="grid-footer">{this.state.parsedPerfhud.longest.footer}</div>
        <div className="table" dangerouslySetInnerHTML={this.state.parsedPerfhud.table}></div>
        <div className="errors">
          {this.state.parsedPerfhud.errors.map(function(error: string, i: number) {
            return <div key={i} className="error">{error}</div>;
          }) }
        </div>
      </div>
    );
  }
}

export interface RenderPageProps extends PerfhudPageProps {
  tickInterval: number;
}

export interface RenderPageState extends PerfhudPageState {
  parsedPerfhud: PerfhudParser;
}
