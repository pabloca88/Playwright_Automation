import { expect, test } from "@playwright/test"

import RegisterPage from "../pages/registerPage"
import LoginPage from "../pages/loginPage"
import HomePage from "../pages/homePage"
import SpecialHotPage from "../pages/specialHotPage"

const email = "Pablo@test.com"
const password = "Test@123"

test.describe('Lambdatest test demo', async () => {
    test('Register User', async ({ page , baseURL}) => {
        const register = new RegisterPage(page);
        await page.goto(`${baseURL}route=account/register`);
    
        //Fill out the form
        await register.enterFirstName ("Pablo");
        await register.enterLastname("Tester");
        await register.enterEmail (email);
        await register.enterTelephone("1234567890");
        await register.enterPassword(password);
        await register.enterConfirmPassword(password);
    
        await register.isSubscribedChecked();
        await register.checkPolicyCheckbox();
        await register.clickContinueBtn();
    
    })
    
    test('Succesfully Login Test Scenario', async ({ page, baseURL }) => {
        const login = new LoginPage(page);
        await page.goto(`${baseURL}route=account/login`)
    
        await login.enterEmailAddress(email);
        await login.enterPassword(password);
        await login.clickContinueBtn();
        expect(await page.title()).toBe("My Account");
    })
    
    test('Add Product to cart', async ({ page, baseURL }) => {
        const login = new LoginPage(page);
        const homePage = new HomePage(page);
        const specialHotPage = new SpecialHotPage(page);
        await page.goto(`${baseURL}route=account/login`)
        await login.login(email, password);
    
        await homePage.clickOnSpecialHeartMenu();
        await specialHotPage.clickOnDesktops();
        await specialHotPage.addFirstProductToCart()
        await page.pause();
        expect(specialHotPage.productAddedIsVisible).toBeTruthy;
    
    })
})



