import { test } from '@playwright/test';
import { StorePage } from '../pages/StorePage';

test.use({ storageState: 'auth/consumer.json' })

test('user can buy a product', async ({ page }) => {
  const store = new StorePage(page);

  // Add product to cart
  await store.addProductToCart('1', '5', 'Apple');

  // Confirm purchase
  await store.confirmPurchase(
    'Markus Hoff',
    'Storgatan 51',
    '5 x Apple - $60'
  );
});