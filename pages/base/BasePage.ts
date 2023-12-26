import { Page } from '@playwright/test';
import { BasePageChecker } from './BasePageChecker';

export class BasePage {
  readonly page: Page;
  private _checker!: BasePageChecker;

  constructor(page: Page) {
    this.page = page;
  }

  public get checker(): BasePageChecker {
    return this._checker;
  }

  public set checker(newChecker: BasePageChecker) {
    this._checker = newChecker;
  }
}
