import { test } from '@playwright/test';
import { StorePage } from '../pages/storePage';
import { LoginPage } from '../pages/loginPage';

const password = process.env.STORE_PASSWORD ?? 'sup3rs3cr3t';

test('user can buy a product', async ({ page }) => {
  const login = new LoginPage(page);
  const store = new StorePage(page);

  await login.goto();

  await login.login('markus', password,'consumer');

  // Add product to cart
  await store.addProductToCart('6', '1', 'Samsung S5');

  // Confirm purchase
  await store.confirmPurchase(
    'Mohamad Daoud',
    'Bergshöjden 58 BV',
    '1 x Samsung S5 - $4999'
  );
});