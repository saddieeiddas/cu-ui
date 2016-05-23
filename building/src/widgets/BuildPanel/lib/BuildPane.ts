/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';

export interface BuildPaneProps {
  data: any;
  minimized: boolean;
}

export enum BuildPaneType {
  Blocks,
  Props,
  Interactive,
  Recent,
  Blueprints,
  WorkList,
  DropLight,
}

export interface BuildPane {
  type: BuildPaneType;
  title: string;
  minTitle: string;
  data: any;
  component: any;
}
