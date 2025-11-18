import { Page } from "@playwright/test";

export default class HomePage {

    constructor(public page: Page) {
        
    }

    async clickOnSpecialHeartMenu() {
        await this.page.click("(//span[normalize-space()='Hot'])[2]")
    }


}