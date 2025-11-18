import { expect, test } from '@playwright/test';

import RegisterPage from '../pages/registerPage';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';
import SpecialHotPage from '../pages/specialHotPage';

// Using a timestamp in the email makes the test re-runnable without manual cleanup.
const uniqueSuffix = Date.now();
const email = `pablo.qa+${uniqueSuffix}@test.com`;
const password = 'Test@123';

test.describe('Lambdatest E2E flow - Register, Login, Add to Cart', () => {
  test('should register a new user', async ({ page, baseURL }) => {
    const registerPage = new RegisterPage(page);

    await test.step('Navigate to registration page', async () => {
      await page.goto(`${baseURL}route=account/register`);
      await expect(page).toHaveTitle(/Register Account/i);
    });

    await test.step('Fill registration form', async () => {
      await registerPage.enterFirstName('Pablo');
      await registerPage.enterLastname('Tester');
      await registerPage.enterEmail(email);
      await registerPage.enterTelephone('1234567890');
      await registerPage.enterPassword(password);
      await registerPage.enterConfirmPassword(password);
      await registerPage.isSubscribedChecked();
      await registerPage.checkPolicyCheckbox();
    });

    await test.step('Submit form and verify account creation', async () => {
      await registerPage.clickContinueBtn();
      await expect(page).toHaveTitle(/Your Account Has Been Created|My Account/i);
    });
  });

  test('should successfully log in with a registered user', async ({ page, baseURL }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await page.goto(`${baseURL}route=account/login`);
      await expect(page).toHaveTitle(/Account Login/i);
    });

    await test.step('Enter credentials and log in', async () => {
      await loginPage.enterEmailAddress(email);
      await loginPage.enterPassword(password);
      await loginPage.clickContinueBtn();
    });

    await test.step('Verify user is redirected to My Account page', async () => {
      await expect(page).toHaveTitle(/My Account/i);
    });
  });

  test('should add a product to the cart from Special Offers', async ({ page, baseURL }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const specialHotPage = new SpecialHotPage(page);

    await test.step('Navigate to login page and authenticate', async () => {
      await page.goto(`${baseURL}route=account/login`);
      await loginPage.login(email, password);
      await expect(page).toHaveTitle(/My Account/i);
    });

    await test.step('Navigate to Special Offers section', async () => {
      await homePage.clickOnSpecialHeartMenu();
      await specialHotPage.clickOnDesktops();
    });

    await test.step('Add first product to the cart and verify success message', async () => {
      await specialHotPage.addFirstProductToCart();
      await specialHotPage.productAddedIsVisible();
    });
  });
});
