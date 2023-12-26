import { Locator, Page } from '@playwright/test'
import { BasePage } from '../base/BasePage';
import { LandingPageChecker } from './LandingPageChecker';

export class LandingPage extends BasePage {
        readonly checker: LandingPageChecker;
        //readonly page: Page;
    
    
    constructor(page: Page) {
        super(page);
        //this.page = page;
        this.checker = new LandingPageChecker(this);
    }

    get loginButton(): Locator { 
        return this.page.getByRole('button', { name: 'Log in' });
    }

    get pagetitle(): Locator {
        return this.page.getByRole('heading', { name: 'Space & Beyond' })
    }

    get destinationButton(): Locator {
        return this.page.getByRole('button', { name: 'Select Destination' });
    }

    async clickOnLoginButton() {
        await this.loginButton.click();
    }


}