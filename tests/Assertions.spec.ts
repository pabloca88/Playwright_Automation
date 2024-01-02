import {test, expect} from '@playwright/test'

        test('Navigate to URL', async ({ page }) => {
            await page.goto('https://demoqa.com/');
            await page.pause();

            //ASSERTIONS

            //Check element present or not
            await expect(page.getByRole('link', { name: 'Selenium Online Training' })).toHaveCount(1);

            if(await page.$('text=Selenium Online Training')){
                await page.getByRole('link', { name: 'Selenium Online Training' }).click();
            }

            //Check element is hidden or visible
            await expect(page.getByRole('link', { name: 'Selenium Online Training' })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Selenium Online Training' })).not.toBeHidden();

            //Check element enabled or disanbled & soft assertion
            //await expect.soft(page.getByRole('link', { name: 'Selenium Online Training' })).toBeDisabled(); //soft assertions not to end the execution
            await expect(page.getByRole('link', { name: 'Selenium Online Training' })).toBeEnabled();

            //check text
            await expect(page.getByRole('heading', { name: 'Elements' })).toHaveText('Elements'); 

            // check attribute value
            //await expect(page.getByRole('heading', { name: 'Elements' })).toHaveAttribute('class', 'card-body');
            //await expect(page.getByRole('heading', { name: 'Elements' })).toHaveClass('card-body');
            
        })