// tests/storeApi.test.ts
import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/storePageApi';

test('mock API add product and verify cart', async ({ page }) => {
  const store = new StorePage(page);

  // --- Step 1: Mock the API call ---
  await page.route('**/api/cart', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ productId: '6', quantity: 2 })
    });
  });

  // --- Step 2: Navigate to store ---
  await store.goto();

  // --- Step 3: Trigger mocked API via UI ---
  await store.addProduct('6', 2);

  // --- Step 4: Verify cart contents ---
  await expect(store.cartRows).toHaveCount(1);
  await expect(store.cartRows.first()).toContainText('Samsung S5');
  await expect(store.cartRows.first()).toContainText('2');

  // --- Step 5: Verify product is in cart ---
  const cartRows = page.locator('h3:has-text("Cart") + table >> tbody >> tr');
  await expect(cartRows).toHaveCount(1);

    await page.waitForTimeout(2000); 

  // --- Step 6: Remove product via page object (triggers mocked API) ---
  await store.removeItemByIndex(0);

    await page.waitForTimeout(2000); 


  // --- Step 7: Verify cart is empty ---
  await expect(cartRows).toHaveCount(0);

});