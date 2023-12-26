import {expect, Locator, Page } from '@playwright/test'
import { BasePage } from '../base/BasePage';
import { Page1Checker } from './Page1Checker';


export class Page1 extends BasePage {
    readonly checker: Page1Checker;
    
    constructor(page: Page) {
    super(page);
    this.checker = new Page1Checker(this);
    }

    get loginButton():Locator { 
        return this.page.getByRole('button', { name: 'Log in' });
    }

    get pagetitle():Locator {
        return this.page.locator('Space & Beyond | Testim.io demo');
    }

    async clickOnLoginButton() {
        await this.loginButton.click();
    }


}