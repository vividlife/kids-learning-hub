import { test, expect } from '@playwright/test';

test('home page loads and displays hero section', async ({ page }) => {
  await page.goto('/');
  
  // Check hero title
  await expect(page.getByRole('heading', { name: /欢迎来到/i })).toBeVisible();
  await expect(page.getByText(/Kids Learning Hub/i)).toBeVisible();
  
  // Check buttons
  await expect(page.getByRole('button', { name: /女儿登录/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /家长登录/i })).toBeVisible();
  
  // Check features section
  await expect(page.getByRole('heading', { name: /核心功能/i })).toBeVisible();
  await expect(page.locator('text=英语学习模块')).toBeVisible();
});

test('home page navigation buttons work', async ({ page }) => {
  await page.goto('/');
  
  // Click daughter login button
  await page.getByRole('button', { name: /女儿登录/i }).click();
  await expect(page).toHaveURL(/.*select-daughter/);
  
  // Note: Would need auth flow implemented for full test, but basic redirect works
});

test('home page is responsive on mobile', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 375, height: 667 });
  
  await expect(page.getByRole('heading', { name: /欢迎来到/i })).toBeVisible();
});
