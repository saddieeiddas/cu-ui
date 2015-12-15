/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

export default class PerfhudParser {
  public errors: string[] = [];
  public average: PerfhudGrid = new PerfhudGrid();
  public longest: PerfhudGrid = new PerfhudGrid();
  public table: SafeHtml = { __html: '' };

  public parse(rawString: string) {
    if (rawString) {
      try {
        const rawHtml: Node = new DOMParser().parseFromString(rawString, 'text/html').childNodes[0].childNodes[1];
        this.buildVfxErrors(<HTMLElement>rawHtml);
        this.buildVfxStats(<HTMLElement>rawHtml);
      } catch (e) {
      }
    }
  }

  private buildVfxErrors(raw: HTMLElement) {
    this.errors = [];
    for (var i = 0; i < raw.children.length - 1; i++) {
      this.errors.push(PerfhudParser.cleanHtmlToString(<HTMLElement>raw.children[i]));
    }
  }

  private buildVfxStats(raw: HTMLElement) {
    const cleanHtml: HTMLElement = PerfhudParser.filterUnecessaryTags(<HTMLElement>(raw.children[raw.children.length - 1]));


    // get average block grid
    const averageHtml: HTMLElement = <HTMLElement>cleanHtml.children[1];
    this.average.header = PerfhudParser.cleanHtmlToString(<HTMLElement>averageHtml.children[0]);
    this.average.grid = { __html: (<HTMLElement>averageHtml.children[1]).outerHTML.replace(/(\r\n|\n|\r)/gm, '') };
    this.average.footer = PerfhudParser.cleanHtmlToString(<HTMLElement>averageHtml.children[2]);

    // get longest block grid
    const longestHtml: HTMLElement = <HTMLElement>cleanHtml.children[2];
    this.longest.header = PerfhudParser.cleanHtmlToString(<HTMLElement>longestHtml.children[0]);
    this.longest.grid = { __html: (<HTMLElement>longestHtml.children[1]).outerHTML.replace(/(\r\n|\n|\r)/gm, '') };
    this.longest.footer = PerfhudParser.cleanHtmlToString(<HTMLElement>longestHtml.children[2]);

    // get tabular vfx stats
    const tableHtml: HTMLElement = <HTMLElement>cleanHtml.children[3];
    tableHtml.removeAttribute('style');
    this.table = { __html: tableHtml.outerHTML.replace(/(\r\n|\n|\r)/gm, '') };
  }

  public static filterUnecessaryTags(element: HTMLElement) {
    for (let i = element.children.length; i--;) {
      if (['br'].indexOf(element.children[i].nodeName.toLowerCase()) >= 0) {
        element.removeChild(element.children[i]);
      }
    }
    return element;
  }

  public static cleanHtmlToString(element: HTMLElement) {
    var cleaned = (element.textContent || element.innerText).replace(/(\r\n|\n|\r)/gm, '');
    cleaned = cleaned.split(' ').filter(function(t: string) { return t != '' }).join(' ');
    return cleaned;
  }
}

export class PerfhudGrid {
  public header: string = '';
  public grid: SafeHtml = { __html: '' };
  public footer: string = '';
}

export interface SafeHtml {
  __html: string;
}
