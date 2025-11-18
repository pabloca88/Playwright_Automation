import {test, expect, Locator} from '@playwright/test'
import { assert } from 'console';

const baseUrl = 'https://the-internet.herokuapp.com';
const USERNAME = 'tomsmith';
const PASSWORD = 'SuperSecretPassword!';
const INVALID_DATA = 'Pablo_Test'

test.describe('Innoit - QA AUTOMATION EXERCISE - Dropdown page', () => {

    test('Test 1: Seleccionar un valor y luego cambiarlo validando su valor en cada interacción', async ({ page }) => {
        
        await test.step('Load browser', async () => {
            await page.goto(`${baseUrl}/dropdown`);
        });

        await test.step('Select option 1 and validate', async () => {
            await page.locator('#dropdown').selectOption('1');
            await expect(page.locator('#dropdown')).toBeVisible();
            await expect(page.locator('#dropdown')).toContainText('Option 1');
        });

        await test.step('Select option 2 and validate', async () => {
            await page.locator('#dropdown').selectOption('2');
            await expect(page.locator('#dropdown')).toBeVisible();
            await expect(page.locator('#dropdown')).toContainText('Option 2');
        });
    });        
});

test.describe('Innoit - QA AUTOMATION EXERCISE - Login Page', () => {

    test.beforeEach(async ({ page })=> {
        await page.goto(`${baseUrl}/login`);
        /*Validate Login Page Loads Correctly and elements are available to interact with*/
        await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
        await expect(page.locator('h2')).toContainText('Login Page');
        await expect(page.getByText('Username', { exact: true })).toBeVisible();
        await expect(page.locator('#login')).toContainText('Username');
        await expect(page.getByText('Password', { exact: true })).toBeVisible();
        await expect(page.locator('#login')).toContainText('Password');
        await expect(page.getByRole('button', { name: ' Login' })).toBeVisible();
        await expect(page.getByRole('button')).toContainText('Login');
    });

    test.afterEach(async ({ page })=> {
        await page.close();
    });
    test('Test 2: Login sucessfull', async ({ page }) => {
        
        await test.step('User log in with accurate data', async () => {
            await page.getByLabel('Username').click();
            await page.getByLabel('Username').fill(USERNAME);
            await page.getByLabel('Password').click();
            await page.getByLabel('Password').fill(PASSWORD);
            await page.getByRole('button', { name: ' Login' }).click();
        });

        await test.step('User logged correctly => Secure area page loaded correctly', async () => {
            await expect(page.getByText('You logged into a secure area')).toBeVisible();
            await expect(page.locator('#flash')).toContainText('You logged into a secure area! ×');
            await expect(page.locator('h4')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
            await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
            await expect(page.locator('#content')).toContainText('Logout');
        });

        await test.step('User logs out correctly', async () => {
            await page.getByRole('link', { name: 'Logout' }).click();
            await expect(page.locator('h2')).toContainText('Login Page');
        });
            
    });

    test('Test 2: Login error: invalid username', async ({ page }) => {

        await test.step('User enters invalid data on username field', async () => {
            await page.getByLabel('Username').click();
            await page.getByLabel('Username').fill(INVALID_DATA);
            await page.getByLabel('Password').click();
            await page.getByLabel('Password').fill(PASSWORD);
            await page.getByRole('button', { name: ' Login' }).click();
        });

        await test.step('Login error: Username is invalid error message loads', async () => {
            await expect(page.getByText('Your username is invalid! ×')).toBeVisible();
            await expect(page.locator('#flash')).toContainText('Your username is invalid! ×');
        });
    
    });

    test('Test 2: Login error: invalid password', async ({ page }) => {
        
        await test.step('User enters invalid data on password field', async () => {
            await page.getByLabel('Username').click();
            await page.getByLabel('Username').fill(USERNAME);
            await page.getByLabel('Password').click();
            await page.getByLabel('Password').fill(INVALID_DATA);
            await page.getByRole('button', { name: ' Login' }).click();
        });

        await test.step('Login error: Password is invalid error message loads', async () => {
            await expect(page.getByText('Your password is invalid! ×')).toBeVisible();
            await expect(page.locator('#flash')).toContainText('Your password is invalid! ×');
        });
        
    });

    test('Test 2: Login error: invalid username & password - empty value', async ({ page }) => {
        
        await test.step('User clicks on Login button with empty values on Username & Password text fields', async () => {
            await page.getByRole('button', { name: ' Login' }).click();
        });

        await test.step('Login error: Username is invalid error message loads & user closes the error message', async () => {
            await expect(page.getByText('Your username is invalid! ×')).toBeVisible();
            await expect(page.locator('#flash')).toContainText('Your username is invalid! ×');
            await page.getByRole('link', { name: '×' }).click();
        });

        await test.step('User remains on Login Page after unsucessfull login', async () => {
            await expect(page.locator('h2')).toContainText('Login Page');
        });
        
        
    });
});

const toCurrencyNumber = (value: string) => Number(value.replace(/[^0-9.]/g, ''));
const sortDescendingThroughUI = async (
    header: Locator,
    dueCells: Locator,
    expectedDescending: string[]
) => {
    for (let attempt = 0; attempt < 3; attempt += 1) {
        await header.click();
        const currentValues = await dueCells.allTextContents();
        if (JSON.stringify(currentValues) === JSON.stringify(expectedDescending)) {
            return currentValues;
        }
    }
    throw new Error('Unable to sort column in descending order');
};

test.describe('Innoit - QA AUTOMATION EXERCISE - Tables Page', () => {
    
    test('Ordenar una de las tablas de mayor a menor por cualquier columna y validar el Due de la fila 2', async ({ page }) => {
        await page.goto(`${baseUrl}/tables`);
        
        const table = page.locator('#table1');
        const dueHeader = table.locator('thead th', { hasText: 'Due' });
        const dueCells = table.locator('tbody tr td:nth-child(4)');

        const originalDueValues = await dueCells.allTextContents();
        const expectedDescending = [...originalDueValues].sort(
            (a, b) => toCurrencyNumber(b) - toCurrencyNumber(a)
        );

        const sortedDueValues = await sortDescendingThroughUI(
            dueHeader,
            dueCells,
            expectedDescending
        );
        await expect(sortedDueValues).toStrictEqual(expectedDescending);

        const secondRowDue = table.locator('tbody tr').nth(1).locator('td').nth(3);
        await expect(secondRowDue).toHaveText(expectedDescending[1]);
    });

    test('Ordenar otra tabla en orden descendente y validar el Due de la fila 2', async ({ page }) => {
        await page.goto(`${baseUrl}/tables`);

        const table = page.locator('#table2');
        const dueHeader = table.locator('thead th', { hasText: 'Due' });
        const dueCells = table.locator('tbody tr td.dues');

        const originalDueValues = await dueCells.allTextContents();
        const expectedDescending = [...originalDueValues].sort(
            (a, b) => toCurrencyNumber(b) - toCurrencyNumber(a)
        );

        const sortedDueValues = await sortDescendingThroughUI(
            dueHeader,
            dueCells,
            expectedDescending
        );
        await expect(sortedDueValues).toStrictEqual(expectedDescending);

        const secondRowDue = table.locator('tbody tr').nth(1).locator('td.dues');
        await expect(secondRowDue).toHaveText(expectedDescending[1]);
    });

});     
