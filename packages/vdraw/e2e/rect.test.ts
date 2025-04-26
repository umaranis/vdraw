import { expect, test } from '@playwright/test';
import { getCanvasLocator } from './helpers';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});

test('rectangle - create', async ({ page }) => {
	await page.goto('/');
	const canvas = getCanvasLocator(page);

	// no rectangles yet
	await expect(canvas.locator('rect')).not.toBeVisible();

	// add one rect
	await canvas.click();
	await expect(canvas.locator('rect')).toBeVisible();
});

test('rectangle - select', async ({ page }) => {
	await page.goto('/');
	const canvas = getCanvasLocator(page);

	// no rectangles yet
	await expect(canvas.locator('rect')).not.toBeVisible();

	// add one rect
	await canvas.click();
	await expect(canvas.locator('rect')).toBeVisible();

	// select rect
	await canvas.locator('rect').click();
	const rectCount = await canvas.locator('rect').count();
	expect(rectCount).toBeGreaterThan(2);
});

test('rectangle - de-select', async ({ page }) => {
	await page.goto('/');
	const canvas = getCanvasLocator(page);

	// no rectangles yet
	await expect(canvas.locator('rect')).not.toBeVisible();

	// add one rect
	await canvas.click();
	await expect(canvas.locator('rect')).toBeVisible();

	// select rect
	await canvas.locator('rect').click();
	const rectCount = await canvas.locator('rect').count();
	expect(rectCount).toBeGreaterThan(2);

	// de-select rect
	await page.keyboard.press('Escape');
	await expect(await canvas.locator('rect').count()).toBe(1);
});

test('rectangle - delete using backspace', async ({ page }) => {
	await page.goto('/');
	const canvas = getCanvasLocator(page);

	// no rectangles yet
	await expect(canvas.locator('rect')).not.toBeVisible();

	// add one rect
	await canvas.click();
	await expect(canvas.locator('rect')).toBeVisible();

	// select rect
	await canvas.locator('rect').click();
	const rectCount = await canvas.locator('rect').count();
	expect(rectCount).toBeGreaterThan(2);

	// delete rect
	await page.keyboard.press('Backspace');
	await expect(canvas.locator('rect')).not.toBeVisible();
});

test('rectangle - delete using delete key', async ({ page }) => {
	await page.goto('/');
	const canvas = getCanvasLocator(page);

	// no rectangles yet
	await expect(canvas.locator('rect')).not.toBeVisible();

	// add one rect
	await canvas.click();
	await expect(canvas.locator('rect')).toBeVisible();

	// select rect
	await canvas.locator('rect').click();
	const rectCount = await canvas.locator('rect').count();
	expect(rectCount).toBeGreaterThan(2);

	// delete rect
	await page.keyboard.press('Delete');
	await expect(canvas.locator('rect')).not.toBeVisible();
});
