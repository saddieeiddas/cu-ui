/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {client} from 'camelot-unchained';
import * as React from 'react';
import {PerfhudPage} from './perfhud-page';
import {PerfhudFps} from './perfhud-fps';
import ClassNames from 'classnames';
import PerfhudSettings from './perfhud-settings';

export class PerfhudWindow extends React.Component<PerfhudWindowProps, PerfhudWindowState> {

  constructor(props: any) {
    super(props);
    const pages = this.props.children.map((child: PerfhudPage) => {
      return child.props.pageTitle;
    });
    const openPages = PerfhudSettings.getActivePages();
    if (openPages.length === 0) {
      openPages.push(pages[0]);
    }
    this.state = {
      pages: pages,
      openPages: openPages,
      maximized: PerfhudSettings.isMaximized(),
      menuOpen: false
    };
  }

  toggleMinimzeMaximize(): void {
    this.state.maximized = !this.state.maximized;
    this.setState(this.state);
    PerfhudSettings.setMinMaxValue(this.state.maximized);
    if (this.state.maximized) {
      this.state.maximized = true;
      this.setState(this.state);
    } else {
      this.state.maximized = false;
      this.state.menuOpen = false;
      this.setState(this.state);
    }
  }

  setActivePage(page: string): void {
    PerfhudSettings.setActivePage(page);
    this.state.openPages = PerfhudSettings.getActivePages();
    this.state.menuOpen = false;
    this.setState(this.state);
  }

  toggleMenu(): void {
    this.state.menuOpen = !this.state.menuOpen;
    this.setState(this.state);
  }

  render() {
    return (
      <div className={ClassNames('cu-window', 'cu-window-transparent', 'cu-window-auto-size', {'perfhud-minimized': !this.state.maximized})}>
        <div className="cu-window-content">
          <PerfhudFps />
          <div className="cu-window-actions">
            <a onMouseDown={this.toggleMinimzeMaximize.bind(this)} className={ClassNames({'cu-window-minimize': this.state.maximized, 'cu-window-maximize': !this.state.maximized})}></a>
          </div>
          <div className="perfhud-content">
            <div className={ClassNames('perfhud-select', {'perfhud-select-open': this.state.menuOpen})}>
              <div className="perfhud-select-active" onMouseDown={this.toggleMenu.bind(this)}>
                {this.state.openPages.join(', ')}
              </div>
              <div className="perfhud-select-options">
                {this.state.pages.map((page: string) => {
                  return (
                    <div key={page} className="perfhud-select-option" onMouseDown={this.setActivePage.bind(this, page)}>{page}</div>
                  );
                })}
              </div>
            </div>
            {this.props.children.filter((child: PerfhudPage) => {
              return this.state.maximized && this.state.openPages.indexOf(child.props.pageTitle) >= 0;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export interface PerfhudWindowProps {
  children?: any;
}

export interface PerfhudWindowState {
  openPages: string[];
  pages: string[];
  maximized: boolean;
  menuOpen: boolean;
}
