/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

export default class PerfhudSettings {

  static getActivePages(): string[] {
    const activePages: string[] = [];
    try {
      let savedActivePages = localStorage.getItem('__perfhud.active_pages');
      if (savedActivePages) {
          savedActivePages = JSON.parse(savedActivePages);
      }
      if (savedActivePages) {
        savedActivePages.forEach((page: string) => {
          activePages.push(page);
        })
      }
    } catch(e) {
    }
    return activePages;
  }

  static setActivePage(page: string) {
    const pages: string[] = [page];
    this.setActivePages(pages);
  }

  static setActivePages(pages: string[]) {
    try {
      localStorage.setItem('__perfhud.active_pages', JSON.stringify(pages));
    } catch(e) {
    }
  }

  static isMaximized(): boolean {
    const storedValue: string = localStorage.getItem('__perfhud.maximized');
    if (storedValue === null) {
      return true;
    } else {
      return storedValue == '1';
    }
  }

  static isMinimized(): boolean {
    return !this.isMaximized();
  }

  static setMinMaxValue(maximized: boolean): void {
    localStorage.setItem('__perfhud.maximized', maximized ? '1' : '0');
  }

}
