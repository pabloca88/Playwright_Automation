import {test, expect} from '@playwright/test'

test.describe('Open URL and Validate the title', () => {


    test('Navigate to the URl', async ({ page }) => {
        await page.goto('https://demo.testim.io');
        await expect(page).toHaveTitle('Space & Beyond | Testim.io demo');
    });

    test('Navigate to URL and validate title v2', async ({ page }) => {
        
        await test.step('go to URl', async () => {
            await page.goto('https://demo.testim.io');
        })

        await test.step('Validate title', async () => {
            await expect(page).toHaveTitle('Space & Beyond | Testim.io demo');
        })
        

        
    })
    
        
})