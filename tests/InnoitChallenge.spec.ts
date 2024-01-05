import {test, expect} from '@playwright/test'

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

test.describe('Innoit - QA AUTOMATION EXERCISE - Tables Page', () => {
    
    test('Ordenar una de las tablas de mayor a menor por cualquier columna', async ({ page }) => {
        await page.goto(`${baseUrl}/tables`);
        const table =  page.locator('#table1');

        const lastNamesHeader = page.locator('#table1').getByText('Last Name');
    
        const tableRow = table.locator('#table1').getByRole('cell', { name: 'Smith', exact: true });
        
        const originalData = await tableRow.allTextContents();

        console.log("Original Data: "+ originalData);
        
        const order = await originalData.sort();

        console.log("Expecting  Descending order : " + order );

        await lastNamesHeader.click();
        
        // After the click the Sorting changes to Sorting Down
        console.log("Expecting ascendent: " + await tableRow.allTextContents())

        await page.locator('#table1').getByRole('cell', { name: '$51.00' }).click();
        await expect(page.locator('#table1').getByRole('cell', { name: '$51.00' })).toBeVisible();

        /*
            IN THIS CASE I HAD SOME ISSUES WITH THE LOCATORS,
            I COULDNT FINISH MY IDEA BUT I WOULD LIKE TO EXPLAING HOW I APPROACHED THE TEST:

            FIRST I LOCATE THE TABLE, THEN I WANTE TO CREATE A CONSTANTE WITH THE "TABLE ROW" WHERE WITH XPATH I GRABBED THE 4 OF THE
            RESULTS => //table[@id='table1']/tbody[1]/tr/td[1] (paste in on console).
            SO BY USING allTextContents i would have the original data (list of original order of values), then with  a sort
            I would sort them in correct descending order, and after the click on the "Last name" header you´ll see the difference
            on each list of Last names that the sorting changed.
            (It would be really likeable to have it in an array and run a sort function to order them) and with that information
            assert the last idea of verifying the 2do value of the "DUE" column.
        */
    });
});       