/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Blueprint} from '../../lib/Blueprint';

const SELECT_BP = 'buildpanel/panes/SELECT_BP';

export function selectBP(id: number) {
  return {
    type: SELECT_BP,
    id: id
  }
}


function getBlueprints() : Array<Blueprint> {
  return null;
}


export interface BlueprintsState {
  blueprints?: Array<Blueprint>;
  selected?: number;
}

const initialState : BlueprintsState = {
  blueprints: getBlueprints(),
  selected: -1,
}

export default function reducer(state: BlueprintsState = initialState, action: any = {}) {
  switch(action.type) {
    case SELECT_BP:
      return Object.assign({}, state, {
        selected: action.id,
      });
    default: return state;
  }
}
