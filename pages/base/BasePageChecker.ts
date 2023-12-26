import { BasePage } from './BasePage';

export class BasePageChecker {
  readonly page: BasePage;

  constructor(page: BasePage) {
    this.page = page;
  }
}
