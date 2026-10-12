import { test, expect } from '@playwright/test';

test('home page shows the Personify title and a Start Quiz button', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'PERSONIFY' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start Quiz' })).toBeVisible();
});

test('taking the quiz leads to a result screen with a character name', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Start Quiz' }).click();

  // Gender question
  await expect(page.locator('.card h2')).toBeVisible();

  const option = page.locator('.options .option').first();
  const result = page.locator('.character-name');

  /* Answer the gender question, then every character question, until the result screen appears.
  Each click triggers the quiz's ~0.5s fade transition before the next question (or result) renders. */
  for (let answered = 0; answered < 20 && (await result.count()) === 0; answered++) {
    await option.click();
    await page.waitForTimeout(350);
  }

  await expect(result).toBeVisible();
  await expect(result).not.toBeEmpty();
});
