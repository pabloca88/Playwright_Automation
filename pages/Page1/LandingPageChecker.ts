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
        await expect(this.page.pagetitle).toBeVisible({ timeout: this.WAIT_30_SECONDS });
    }

}