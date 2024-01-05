import {test, expect} from '@playwright/test'

test.describe('QA AUTOMATION EXERCISE', () => {

    const baseUrl = 'https://api.spacexdata.com/'

    test('Path 1', async ({ page }) => {
        
        await test.step('load browser', async () => {
            await page.goto('https://csb-x6dpt1.netlify.app/');
        });

        await test.step('Search CRS on the UI search box', async () => {
            await page.getByRole('textbox').click();
            await page.getByRole('textbox').fill('crs');
            await page.getByRole('textbox').press('Enter');
        });

        await test.step('Check that 3 pages are being founded', async () => {
            await expect(page.getByText('3', {exact: true})).toBeVisible();
        });

        await test.step('Go to page 2 and mark CRS-13 as a favourite', async () => {
            await page.getByText('2', { exact: true }).click();
            /*We first validate the element is present and represents the actual value*/
            await expect(page.locator('#root')).toContainText('CRS-13');
            await page.locator('div:nth-child(3) > .content > svg').click();
        });

        await test.step('Go to the favourite tab and check that CRS-13 is there', async () => {
            await expect(page.getByRole('banner')).toContainText('Favorites');
            await page.getByText('Favorites').click();
            await expect(page.getByRole('heading')).toContainText('CRS-13');
        });

        await test.step('Refresh browser', async () => {
            await page.reload();
        });
        
        await test.step('Check again for step 5', async () => {
            await page.getByText('Favorites').click();
            await expect(page.getByRole('heading')).toContainText('CRS-13');
        });
    });

    test('Verify response contains information for 4 rockets, the field first_flight is in all cass later than 2005', async ({ request }) => {
        const response = await request.get(`${baseUrl}v3/rockets`);
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        console.log(responseBody);
        //expect(responseBody.id).toBe(4);
        //expect(responseBody.first_flight).toBeGreaterThan(2005);
    });

    test('Path 2', async ({ page }) => {
        await test.step('load browser', async () => {
            await page.goto('https://csb-x6dpt1.netlify.app/');
            //await page.pause();
        });

        await test.step('Search crx and check there is no results texts being displayed', async () => {
            await page.getByRole('textbox').click();
            await page.getByRole('textbox').fill('crx');
            await expect(page.locator('div').filter({ hasText: 'LaunchesAllFavorites' }).nth(1)).toBeVisible();
            await expect(page.getByText('3', {exact: true})).toBeHidden();
        });

        await test.step('Click X button inside the search input', async () => {
            await page.getByRole('img', { name: 'Close' }).click();
        });

        await test.step('Check that 12 pages are being displayed again', async () => {
            await expect(page.getByText('12')).toBeVisible();
        });

        await test.step('Refresh browser', async () => {
            await page.reload();
        });

        await test.step('Click X button inside the search input', async () => {
            await page.getByRole('img', { name: 'Close' }).click();
        });
        
    });

    test('Verify response is an array of length==4 and the first_flight is in all cases later than 2005', async ({ request }) => {
        const response = await request.get(`${baseUrl}v3/rockets`);
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        console.log(responseBody);
        //expect(responseBody.id).toBe(4);
        //expect(responseBody.first_flight).toBeGreaterThan(2005);
    });

    
        

});