import { test, expect , Page} from '@playwright/test';
import { Page1} from '../pages/Page1/Page1';
import { Page2 } from '../pages/Page2/Page2';

test.describe('Playwright coding challenge', () => {
    let page1: Page1;
    let page: Page;
    //let page2: Page2;

    test('Pruebo el click al boton login', async ({ page }) => {

        await test.step('navego a la web de testim', async () => {
            await page.goto('https://demo.testim.io/');
        })

        await test.step('Valido que el titulo es el correcto', async () => {
            await page1.checker.verifyTitleIsVisible();
        })
        
        
        await test.step('hago click en el boton Login', async () => {
            await page1.clickOnLoginButton();
        })
        
        
        
    })
    

    
    
});