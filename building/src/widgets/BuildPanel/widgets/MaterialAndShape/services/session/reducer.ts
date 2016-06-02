/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {combineReducers} from 'redux';

import blocksReducer, {BlocksState} from './blocks';
let blocks = blocksReducer;

import materialsReducer, {MaterialsState} from './materials';
let materials = materialsReducer;

export default combineReducers({
  blocks,
  materials,
});

export interface GlobalState {
  blocks: BlocksState,
  materials: MaterialsState,
}
