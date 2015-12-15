/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {PerfhudPage, PerfhudPageProps, PerfhudPageState} from './../perhud/perfhud-page';

import {RenderPage} from './render/render';
import {NetworkPage} from './network/network';
import {PhysicsPage} from './physics/physics';

export class AllPages extends React.Component<PerfhudPageProps, PerfhudPageState> implements PerfhudPage {

    constructor(props: PerfhudPageProps) {
      super(props);
    }

    render() {
      return (
        <div>
          <RenderPage pageTitle="Render" tickInterval={10} />
          <NetworkPage pageTitle="Network" tickInterval={10} />
          <PhysicsPage pageTitle="Physics" tickInterval={10} />
        </div>
      );
    }
}
