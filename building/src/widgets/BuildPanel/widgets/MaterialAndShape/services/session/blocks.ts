/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Block} from '../../lib/Block';
import {client} from 'camelot-unchained';

const SELECT_BLOCK = 'buildpanel/panes/SELECT_BLOCK';

export function selectBlock(id: number) {
  return {
    type: SELECT_BLOCK,
    id: id
  }
}

function getBlocks() : [Block] {
  return [
    {
      id: 1,
      icon: './images/cube.png',
      name: 'block one',
      tags: ''
    },{
      id: 2,
      icon: './images/cube.png',
      name: 'block two',
      tags: ''
    },{
      id: 3,
      icon: './images/cube.png',
      name: 'block three',
      tags: ''
    },{
      id: 4,
      icon: './images/cube.png',
      name: 'block four',
      tags: ''
    },{
      id: 5,
      icon: './images/cube.png',
      name: 'block five',
      tags: ''
    },{
      id: 6,
      icon: './images/cube.png',
      name: 'block six',
      tags: ''
    },
  ];
}

let cuApi: any;

export function blocksForMaterial(materialID: number, blocks: [Block]) : [Block] {
  // get ids from client
  // client.BlockIDsforSubstanceID
  var ids = [1, 2, 3];
  return blocks.filter((block: Block) => ids.indexOf(block.id) != -1) as [Block];
}

export interface BlocksState {
  Blocks?: [Block];
  selected?: number;
}

const initialState : BlocksState = {
  Blocks: getBlocks(),
  selected: 1,
}

export default function reducer(state: BlocksState = initialState, action: any = {}) {
  switch(action.type) {
    case SELECT_BLOCK:
      return Object.assign({}, state, {
        selected: action.id,
      });
    default: return state;
  }
}
