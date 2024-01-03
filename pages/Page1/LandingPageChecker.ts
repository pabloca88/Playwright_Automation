import { expect } from '@playwright/test';
import { LandingPage } from './LandingPage';
import { BasePageChecker } from '../base/BasePageChecker';

export class LandingPageChecker extends BasePageChecker{
    readonly page: LandingPage;
    readonly WAIT_30_SECONDS: number = 30000;

    constructor(page: LandingPage) {
        super(page);
        this.page = page;
    }

    async verifyTitleIsVisible() {
        await expect(this.page.pagetitle).toBeVisible();
    }

    async verifyLoginButtonIsVisible() {
        await expect(this.page.loginButton).toBeVisible();
    }

    async selectDestinationButtonIsVisible() {
        await expect(this.page.destinationButton).toBeVisible();
    }

}