import { Page } from "@playwright/test";


export default class LoginPage {
 
    constructor(public page: Page) {

    }

    //precondition
    async login(email: string, password: string){
        await this.enterEmailAddress(email);
        await this.enterPassword(password);
        await this.clickContinueBtn();
    }

    async clickRegisterOption() {
        await this.page.getByText("Register").click();
    }

    async enterEmailAddress(email: string){
        await this.page.locator("#input-email").fill(email);
    }

    async enterPassword(password: string) {
        await this.page.locator("#input-password").fill(password);
    }

    async clickContinueBtn() {
        await this.page.locator("//input[@type='submit']").click();
    }
}