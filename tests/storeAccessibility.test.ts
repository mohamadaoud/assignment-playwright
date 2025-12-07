import { expect, test } from '@playwright/test';
import { injectAxe } from 'axe-playwright';

test('store2 accessibility scan (log only)', async ({ page }) => {
  await page.goto('https://hoff.is/store2/');
  await injectAxe(page);

  const results = await page.evaluate(async () => {
    // @ts-ignore
    return await axe.run();
  });

  console.log('Accessibility violations:', results.violations);
  // No assertion here, so test passes even if violations exist

  const seriousViolations = results.violations.filter((v: { impact: string; }) =>
  v.impact === 'serious' || v.impact === 'critical'
);

expect(seriousViolations.length).toBe(2);

});