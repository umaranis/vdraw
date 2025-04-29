import { expect, test } from '@playwright/test';
import { getCanvasLocator } from './helpers';

test('rectangle - create', async ({ page }) => {
	await page.goto('/');
	const canvas = getCanvasLocator(page);

	// no rectangles yet
	await expect(canvas.locator('rect')).not.toBeVisible();

	// add one rect
	await canvas.click();
	await expect(canvas.locator('rect:not(.overlay,.trace)')).toBeVisible();
});

test('rectangle - select by clicking overlay', async ({ page }) => {
	await page.goto('/');
	const canvas = getCanvasLocator(page);

	// no rectangles yet
	await expect(canvas.locator('rect')).not.toBeVisible();

	// add one rect
	await canvas.click();
	await expect(canvas.locator('rect:not(.overlay,.trace)')).toBeVisible();

	// select rect
	await canvas.locator('rect.overlay').click();
	const rectCount = await canvas.locator('rect').count();
	expect(rectCount).toBeGreaterThan(5);
});

// *** tested manually not able to test through playwright
// test('rectangle - select by clicking trace', async ({ page }) => {
// 	await page.goto('/');
// 	const canvas = getCanvasLocator(page);

// 	// no rectangles yet
// 	await expect(canvas.locator('rect')).not.toBeVisible();

// 	// add one rect
// 	await canvas.click();
// 	await expect(canvas.locator('rect:not(.overlay,.trace)')).toBeVisible();

// 	// select rect
// 	await canvas.locator('rect.overlay').hover(); // to show trace
// 	await expect(canvas.locator('rect.trace')).toBeVisible();
// 	await canvas.locator('rect.trace').click();
// 	const rectCount = await canvas.locator('rect').count();
// 	expect(rectCount).toBeGreaterThan(5);
// });

test('rectangle - de-select using escape key', async ({ page }) => {
	await page.goto('/');
	const canvas = getCanvasLocator(page);

	// no rectangles yet
	await expect(canvas.locator('rect')).not.toBeVisible();

	// add one rect
	await canvas.click();
	await expect(canvas.locator('rect:not(.overlay,.trace)')).toBeVisible();

	// select rect
	await canvas.locator('rect.overlay').click();
	expect(canvas.locator('rect.selection-rect')).toBeVisible();

	// de-select rect
	await page.keyboard.press('Escape');
	expect(canvas.locator('rect.selection-rect')).not.toBeVisible();
});

test('rectangle - de-select using canvas click', async ({ page }) => {
	await page.goto('/');
	const canvas = getCanvasLocator(page);

	// no rectangles yet
	await expect(canvas.locator('rect')).not.toBeVisible();

	// add one rect
	await canvas.click();
	await expect(canvas.locator('rect:not(.overlay,.trace)')).toBeVisible();

	// select rect
	await canvas.locator('rect.overlay').click();
	expect(canvas.locator('rect.selection-rect')).toBeVisible();

	// de-select rect
	await canvas.click({ position: { x: 500, y: 500 } });
	expect(canvas.locator('rect.selection-rect')).not.toBeVisible();
});

test('rectangle - delete using backspace', async ({ page }) => {
	await page.goto('/');
	const canvas = getCanvasLocator(page);

	// no rectangles yet
	await expect(canvas.locator('rect')).not.toBeVisible();

	// add one rect
	await canvas.click();
	await expect(canvas.locator('rect:not(.overlay,.trace)')).toBeVisible();

	// select rect
	await canvas.locator('rect.overlay').click();
	expect(canvas.locator('rect.selection-rect')).toBeVisible();

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
	await expect(canvas.locator('rect:not(.overlay,.trace)')).toBeVisible();

	// select rect
	await canvas.locator('rect.overlay').click();
	expect(canvas.locator('rect.selection-rect')).toBeVisible();

	// delete rect
	await page.keyboard.press('Delete');
	await expect(canvas.locator('rect')).not.toBeVisible();
});
