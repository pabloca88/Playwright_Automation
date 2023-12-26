import { test, expect , type Page} from '@playwright/test';
import { LandingPage} from '../pages/Page1/LandingPage';
import { LandingPageChecker } from '../pages/Page1/LandingPageChecker';

test.beforeEach(async ({ page })=> {
    await page.goto('https://demo.testim.io');
})

    let page: Page;
    let landingPage: LandingPage;
    let lantingPageChecker: LandingPageChecker;

test.describe('Playwright coding challenge', () => {
    test('Given the user Navigates to Testim and click on Login Button', async ({ page }) => {
            
        await test.step('Valido que el titulo es el correcto', async () => {
            //await landingPage.checker.verifyTitleIsVisible();
        })
                
        await test.step('hago click en el boton Login', async () => {
            await page.getByRole('button', { name: 'Log in' }).click();
            //await landingPage.clickOnLoginButton();
        })
    });
        

});
