import { Locator, Page } from "@playwright/test";
import { BasePage} from '../base/BasePage';

export class randomPage {
    readonly page: Page;
    
    constructor(page:Page) {
        this.page =  page;
    }

    get backIcon(): Locator {
        return this.page.locator(".header-action");
    }

    async playBackIcon(){
        await this.backIcon.click();
    }

    async toggleSpacekeyboard() {
        this.page.keyboard.press('')
    }


}