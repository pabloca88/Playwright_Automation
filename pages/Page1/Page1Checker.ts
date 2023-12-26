import { expect } from '@playwright/test';
import { Page1 } from './Page1';
import { BasePageChecker } from '../base/BasePageChecker';

export class Page1Checker extends BasePageChecker {
    readonly page: Page1;
    readonly WAIT_30_SECONDS: number = 30000;

    constructor(page: Page1){
        super(page);
        this.page = page;
    }
}