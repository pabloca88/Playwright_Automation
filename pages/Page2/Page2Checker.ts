import { expect } from '@playwright/test';
import { Page2 } from './Page2';

export class Page1Checker {
    readonly page: Page2;
    readonly WAIT_30_SECONDS: number = 30000;

    constructor(page: Page2){
        this.page = page;
    }
}