import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/storePage2';

test('Add, delete, buy and confirm purchase on hoff.is', async ({ page }) => {
  const store = new StorePage(page);

  await store.goto();

  // --- Add products ---
  await store.addProduct('6', 2);
  await store.addProduct('4', 1);
  await store.addProduct('5', 3);

  // --- Delete some products ---
  await store.removeItemByIndex(1); // delete second item
  await store.removeItemByIndex(0); // delete first item

  // --- Proceed to checkout ---
  await store.proceedToBuy();

  // --- Fill checkout info ---
  await store.fillCheckoutInfo('Mohamad Daoud', 'Bergshöjden 58 BV');

  // --- Confirm purchase ---
  await store.confirmPurchase();

  // --- Close confirmation modal ---
  await store.closeConfirmationModal();
});