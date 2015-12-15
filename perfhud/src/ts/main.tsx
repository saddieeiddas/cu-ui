/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/// <reference path="./main.d.ts"/>

import {events} from 'camelot-unchained';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {PerfhudWindow} from './perhud/perfhud-window';

import {RenderPage} from './pages/render/render';
import {NetworkPage} from './pages/network/network';
import {PhysicsPage} from './pages/physics/physics';
import {AllPages} from './pages/all-pages';

events.on('init', () => {
  ReactDOM.render(
    (
      <PerfhudWindow>
        <RenderPage pageTitle="Render" tickInterval={10} />
        <NetworkPage pageTitle="Network" tickInterval={10} />
        <PhysicsPage pageTitle="Physics" tickInterval={10} />
        <AllPages pageTitle="All Pages" />
      </PerfhudWindow>
    ),
    document.getElementById('perfhud')
  );
});
