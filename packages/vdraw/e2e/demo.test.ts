import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});

test('rectangle - create', async ({ page }) => {
	await page.goto('/');

	// no rectangles yet
	await expect(page.locator('rect')).not.toBeVisible();

	// add one rect
	await page.click('svg');
	await expect(page.locator('rect')).toBeVisible();
});

test('rectangle - select', async ({ page }) => {
	await page.goto('/');

	// no rectangles yet
	await expect(page.locator('rect')).not.toBeVisible();

	// add one rect
	await page.click('svg');
	await expect(page.locator('rect')).toBeVisible();

	// select rect
	await page.locator('rect').click();
	const rectCount = await page.locator('rect').count();
	expect(rectCount).toBeGreaterThan(2);
});

test('rectangle - delete using backspace', async ({ page }) => {
	await page.goto('/');

	// no rectangles yet
	await expect(page.locator('rect')).not.toBeVisible();

	// add one rect
	await page.click('svg');
	await expect(page.locator('rect')).toBeVisible();

	// select rect
	await page.locator('rect').click();
	const rectCount = await page.locator('rect').count();
	expect(rectCount).toBeGreaterThan(2);

	// delete rect
	await page.keyboard.press('Backspace');
	await expect(page.locator('rect')).not.toBeVisible();
});

test('rectangle - delete using delete key', async ({ page }) => {
	await page.goto('/');

	// no rectangles yet
	await expect(page.locator('rect')).not.toBeVisible();

	// add one rect
	await page.click('svg');
	await expect(page.locator('rect')).toBeVisible();

	// select rect
	await page.locator('rect').click();
	const rectCount = await page.locator('rect').count();
	expect(rectCount).toBeGreaterThan(2);

	// delete rect
	await page.keyboard.press('Delete');
	await expect(page.locator('rect')).not.toBeVisible();
});
