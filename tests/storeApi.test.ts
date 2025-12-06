import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/storePage2';

test('mock API checkout and verify thank you message', async ({ page }) => {
  const store = new StorePage(page);

  // --- Step 1: Mock the checkout API ---
  await page.route('**/api/checkout', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        message: 'Thank you for your purchase, Mohamad Daoud'
      })
    });
  });

  // --- Step 2: Navigate to store and add product ---
  await store.goto();
  await store.addProduct('6', 1); // add Samsung S5

  // --- Step 3: Proceed to checkout ---
  await store.proceedToBuy();
  await store.fillCheckoutInfo('Mohamad Daoud', 'Bergshöjden 58 BV');

  // --- Step 4: Confirm purchase (triggers mocked API) ---
  await store.confirmPurchase();

  // --- Step 5: Verify thank‑you message appears ---
  const thankYou = page.locator('#name');
  await expect(thankYou).toContainText('Thank you for your purchase, Mohamad Daoud');

  // --- Step 6: Close modal ---
  await store.closeConfirmationModal();
});