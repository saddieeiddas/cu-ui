/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { client } from 'camelot-unchained';

export interface Block {
  id: number;
  icon: string;
  shapes: string[];
  shape: string;
  types: string[];
  type: string;
}

export interface TypeBlock {
  id: number,
  type: string,
  shape: string,
  icon: string
}

export interface ShapeBlock {
  id: number,
  shape: string,
  icon: string
}

// action types
const LOAD_BLOCKS = 'cu-ui/building/blocks/LOAD_BLOCKS';
const REQUEST_BLOCKS = 'cu-ui/building/blocks/REQUEST_BLOCKS';
const REQUEST_BLOCK_TAGS = 'cu-ui/building/blocks/REQUEST_BLOCK_TAGS';
const RECEIVED_BLOCK_TAGS = 'cu-ui/building/blocks/RECEIVED_BLOCK_TAGS';
const RECEIVED_BLOCKS = 'cu-ui/building/blocks/RECEIVED_BLOCKS';

const LOADING_BLOCKS_AND_TAGS = 'cu-ui/building/blocks/LOADING_BLOCKS_AND_TAGS';


// sync actions
function loadingBlocksAndTags() {
  return {
    type: LOADING_BLOCKS_AND_TAGS
  }
}

function receivedBlocks(blocks: any) {
  return {
    type: RECEIVED_BLOCKS,
    blocks: blocks
  }
}

function receivedBlockTags(id: number, tags: any) {
  return {
    type: RECEIVED_BLOCK_TAGS,
    id: id,
    tags: tags
  }
}


// async actions
export function listenForBlocks() {
  return (dispatch: (action: any) => any) => {
    dispatch(loadingBlocksAndTags());
    client.OnReceiveBlocks((blocks: any) => dispatch(receivedBlocks(blocks)));
    client.OnReceiveBlockTags((id: number, tags: any) => dispatch(receivedBlockTags(id, tags)));
    
  }
}

export interface BlocksState {
  isLoadingBlocks?: boolean;
  isLoadingBlockTags?: boolean;
  shapes?: ShapeBlock[];
  types?: string[];
  blocks?: Block[];
}

const initialState = {
  isLoadingBlocks: false,
  isLoadingBlockTags: false,
  shapes: <ShapeBlock[]>[],
  types: <string[]>[],
  blocks: <Block[]>[]
}

export default function reducer(state: BlocksState = initialState, action: any = {}) {
  switch(action.type) {
    case LOAD_BLOCKS:
    case LOADING_BLOCKS_AND_TAGS:
      return Object.assign({}, state, {
        isLoadingBlocks: true,
        isLoadingBlockTags: true,
      });
    case REQUEST_BLOCK_TAGS:
      return Object.assign({}, state, {
        isLoadingBlockTags: true,
      });
    case RECEIVED_BLOCKS:
    case RECEIVED_BLOCK_TAGS:
      let blocks = state.blocks.slice();
      if (typeof blocks[action.id] == 'undefined') return state;
      blocks[action.id].shapes = action.tags.Shapes;
      blocks[action.id].shape = action.tags.Shapes.join('-');
      blocks[action.id].types = action.tags.Types;
      blocks[action.id].type = action.tags.Types.join('-');
      return Object.assign({}, state, {
        blocks: blocks
      });
    default: return state;
  }
}
