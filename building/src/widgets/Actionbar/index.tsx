/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {client} from 'camelot-unchained';

import ActionButton from './components/ActionButton';

export interface ActionBarProps {
}

export interface ActionBarState {
  minimized: boolean;
}

class ActionBar extends React.Component<ActionBarProps, ActionBarState> {

  constructor(props: ActionBarProps) {
    super(props);
    this.state = {
      minimized:false,
    }
  }
  
  onMinMax() {
    this.setState({
      minimized: !this.state.minimized,
    });
  }
  
  onSelect() {
    console.log('select');
  }
  
  onAdd() {
    client.CommitBlock();
  }
  
  onDelete() {
    console.log('delete');
  }
  
  onReturn() {
    console.log('return');
  }
  
  onUndo() {
    console.log('undo');
  }
  
  onRedo() {
    console.log('redo');
  }
  
  onRotX() {
    client.BlockRotateX();
  }
  
  onRotY() {
    client.BlockRotateY();
  }
  
  onRotZ() {
    client.BlockRotateZ();
  }
  
  onFlipX() {
    client.BlockFlipX();
  }
  
  onFlipY() {
    client.BlockFlipY();
  }
  
  onFlipZ() {
    client.BlockFlipZ();
  }

  render() {
    return (
      <div className='action-bar'>
        <header>
          <span className='min-max' onClick={() => this.onMinMax()}>
          {this.state.minimized ? '>>' : '<<'}
          </span>
        </header>
        <ul>
        
          <li onClick={() => this.onSelect()}>
            <ActionButton isActive={false}
                          icon={'images/cube-action-bar.svg#select'} />
            {this.state.minimized ? null : <em>1</em>}                          
          </li>
          
          <li onClick={() => this.onAdd()}>
            <ActionButton isActive={false}
                          icon={'images/cube-action-bar.svg#add-block'} />
            {this.state.minimized ? null : <em>2</em>}                          
          </li>
          
          <li onClick={() => this.onDelete()}>
            <ActionButton isActive={false}
                          icon={'images/cube-action-bar.svg#del-block'} />
            {this.state.minimized ? null : <em>3</em>}                          
          </li>
          
          <li onClick={() => this.onReturn()}>
            <ActionButton isActive={false}
                          icon={'images/cube-action-bar.svg#return-block'} />
            {this.state.minimized ? null : <em>4</em>}                          
          </li>
          
          <li onClick={() => this.onUndo()}>
            <ActionButton isActive={false}
                          icon={'images/cube-action-bar.svg#undo'} />
            {this.state.minimized ? null : <em>5</em>}                          
          </li>
          
          <li onClick={() => this.onRedo()}>
            <ActionButton isActive={false}
                          icon={'images/cube-action-bar.svg#redo'} />
            {this.state.minimized ? null : <em>6</em>}                          
          </li>
          
          <li onClick={() => this.onRotX()}>
            <ActionButton isActive={false}
                          icon={'images/cube-action-bar.svg#rotate-x'} />
            {this.state.minimized ? null : <em>7</em>}                          
          </li>
          
          <li onClick={() => this.onRotY()}>
            <ActionButton isActive={false}
                          icon={'images/cube-action-bar.svg#rotate-y'} />
            {this.state.minimized ? null : <em>8</em>}                          
          </li>
          
          <li onClick={() => this.onRotZ()}>
            <ActionButton isActive={false}
                          icon={'images/cube-action-bar.svg#rotate-z'} />
            {this.state.minimized ? null : <em>9</em>}                          
          </li>
          
          <li onClick={() => this.onFlipX()}>
            <ActionButton isActive={false}
                          icon={'images/cube-action-bar.svg#flip-x'} />
            {this.state.minimized ? null : <em>0</em>}                         
          </li>
          
          <li onClick={() => this.onFlipY()}>
            <ActionButton isActive={false}
                          icon={'images/cube-action-bar.svg#flip-y'} />
            {this.state.minimized ? null : <em>-</em>}                          
          </li>
          
          <li onClick={() => this.onFlipZ()}>
            <ActionButton isActive={false}
                          icon={'images/cube-action-bar.svg#flip-z'} />
            {this.state.minimized ? null : <em>=</em>}                          
          </li>
          
        </ul>
      </div>
    )
  }
}

export default ActionBar;
