import {expect, Locator, Page } from '@playwright/test'
import { BasePage } from '../base/BasePage';
import { Page2Checker } from './Page2Checker';


export class Page2 {
    readonly checker: Page1Checker;
    
    constructor(page:Page) {
    super(page);
    this.checker = new Page1Checker(this);
    }


}