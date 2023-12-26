import { test, expect , type Page} from '@playwright/test';
import { LandingPage} from '../pages/Page1/LandingPage';
import { LandingPageChecker } from '../pages/Page1/LandingPageChecker';

let page: Page;
let landingPage: LandingPage;
let lantingPageChecker: LandingPageChecker;

test.beforeEach(async ({ page })=> {
    await page.goto('https://demo.testim.io');
    await expect (page).toHaveTitle('Space & Beyond | Testim.io demo');
})


test.describe('Playwright coding challenge', () => {
    test('Given the user Navigates to Testim and click on Login Button', async ({ page }) => {
        landingPage = new LandingPage(page);
        
        await test.step('Validate the title, the login & select destination button is visible   ', async () => {
            await landingPage.checker.verifyTitleIsVisible();
            await landingPage.checker.verifyLoginButtonIsVisible();
            await landingPage.checker.selectDestinationButtonIsVisible();
        })
                
        await test.step('I click on the Login button', async () => {
            await landingPage.clickOnLoginButton();
        })
    });
        

});
