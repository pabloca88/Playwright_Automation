import { Locator, Page, expect } from "@playwright/test";
import { strict } from "assert";

export default class SpecialHotPage {

    constructor(public page: Page) { }

    //REVISAR   
    async clickOnDesktops() {
        await this.page.locator("//a[contains(text(),'Desktops (75)')]").click();
    }

    async addFirstProductToCart() {
        await this.page.hover("//div[@class='image']/a",{ strict: false });
        await this.page.locator("//button[@title='Add to Cart']").nth(0).click();
    }

    async productAddedIsVisible(){
        await expect(this.page.locator('#notification-box-top').getByRole('img')).toBeVisible();
    }

    
}