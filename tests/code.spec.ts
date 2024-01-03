import {Page, expect, test} from '@playwright/test'

const USER_NAME = "Pablo"
const PASSWORD = "test"
const BASE_URL = 'https://pokeapi.co';
const BERRYNAME = 'cheri';

const baseUrl = 'https://reqres.in/api';

test.describe('Peer Coding Demo',()=> {
        test('navigate to webpage', async ({ page }) => {
            await page.goto('https://demo.testim.io');
            //await page.pause();

            await test.step('validate User is on login Page', async () => {
                await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
                await expect(page.getByRole('button', { name: 'Select Destination' })).toBeVisible();
                await expect(page.locator('#app')).toContainText('Space & Beyond');
            })

            await test.step('User login Page', async () => {
                await page.getByRole('button', { name: 'Log in' }).click();
                await expect(page.locator('#app')).toContainText('Login');
                await page.locator('#login input[type="text"]').click();
                await page.locator('#login input[type="text"]').fill(USER_NAME);
                await page.locator('#login input[type="text"]').press('Tab');
                await page.locator('input[type="password"]').fill(PASSWORD);
                await page.getByRole('navigation').getByRole('button', { name: 'Log in'}).click();
            })

            await test.step('Logged user , logs out', async () => {
                await expect(page.getByRole('list')).toContainText('Hello, John');
                await page.getByRole('button', {name: 'Hello, John'}).click();
                await page.getByRole('link', {name: 'Log out'}).click();
            })

            await test.step('Validate the user is succesfully loged out', async () => {
                await expect(page.getByRole('listitem')).toContainText('Log in');
                await page.close();
            })
        });
    });

test.describe('API Testing ',async () => {
    test('GET List Users - https://reqres.in/api/users/2 - 200 OK', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`);
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(2);
    });

    test('GET https://pokeapi.co/api/v2/berry/{id or name}/, 200 Ok', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/v2/berry/${BERRYNAME}`);
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
    });

    test('POST Request - create new user 200 OK', async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
        data: 
            {
                "name": "Pablo", 
                "job": "QA test"
            }
        });
            const responseBody = JSON.parse(await response.text());
            console.log(responseBody)
            expect(responseBody.name).toBe("Pablo");
            expect(responseBody.job).toBe("QA test");
            expect(responseBody.createdAt).toBeTruthy(); 
            expect(response.status()).toBe(201);
    });
 
});