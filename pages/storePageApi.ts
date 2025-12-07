// pages/storePage.ts
import { Page, Locator } from '@playwright/test';

export class StorePage {
  readonly cartRows: Locator;

  constructor(private page: Page) {
    this.cartRows = page.locator('h3:has-text("Cart") + table >> tbody >> tr');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://hoff.is/store2/');
  }

  async addProduct(productId: string, amount: number): Promise<void> {
    await this.page.getByTestId('select-product').selectOption(productId);
    await this.page.getByRole('textbox', { name: 'Amount' }).fill(String(amount));
    await this.page.getByTestId('add-to-cart-button').click();
  }

  async removeItemByIndex(index: number): Promise<void> {
    const row = this.cartRows.nth(index);
    await row.getByRole('button', { name: 'Remove' }).click();
  }

  async getCartCount(): Promise<number> {
    return await this.cartRows.count();
  }

  async proceedToBuy(): Promise<void> {
    await this.page.getByRole('button', { name: 'Buy' }).click();
  }

  async fillCheckoutInfo(name: string, address: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Name:' }).fill(name);
    await this.page.getByRole('textbox', { name: 'Address:' }).fill(address);
  }

  async confirmPurchase(): Promise<void> {
    await this.page.getByRole('button', { name: 'Confirm Purchase' }).click();
  }

  async closeConfirmationModal(): Promise<void> {
    await this.page.getByText('Close').click();
  }
}