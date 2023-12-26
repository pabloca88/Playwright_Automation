import {expect, Locator, Page } from '@playwright/test'
import { BasePage } from '../base/BasePage';
import { Page1Checker } from './Page1Checker';


export class Page1 extends BasePage {
    readonly checker: Page1Checker;
    
    constructor(page:Page) {
    super(page);
    this.checker = new Page1Checker(this);
    }
}