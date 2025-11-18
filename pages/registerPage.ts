import { Page, expect } from "@playwright/test";

export default class RegisterPage{

    constructor(public page: Page) {

    }
    
    async enterFirstName(firstname: string){
        await this.page.locator("#input-firstname").fill(firstname);
    }

    async enterLastname(lastname: string){
        await this.page.locator("#input-lastname").fill(lastname);
    }

    async enterEmail(email: string){
        await this.page.locator("#input-email").fill(email);
    }

    async enterTelephone(telephoneNumber: string){
        await this.page.locator("#input-telephone").fill(telephoneNumber);
    }

    async enterPassword(password: string){
        await this.page.locator("#input-password").fill(password);
    }

    async enterConfirmPassword(password: string){
        await this.page.locator("#input-confirm").fill(password);
    }

    async isSubscribedChecked() {
        await expect(this.page.locator("label[for='input-newsletter-no']").isChecked).toBeTruthy();
    }

    async checkPolicyCheckbox() {
        await this.page.locator("label[for='input-agree']").check();
    }

    async clickContinueBtn() {
        await this.page.locator("input[type='submit']").click();
    }

};