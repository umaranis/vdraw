import { expect, test } from '@playwright/test';
import { getCanvasLocator, selectCircleTool, selectRectangleTool } from './helpers';

test('rectangle - create', async ({ page }) => {
	await page.goto('/');
	const canvas = getCanvasLocator(page);

	// no rectangles yet
	await expect(canvas.locator('rect')).not.toBeVisible();

	// add one rect
	await selectRectangleTool(page);
	await canvas.click({ position: { x: 10, y: 10 } });
	await expect(canvas.locator('rect:not(.overlay,.trace)')).toBeVisible();

	// add one circle
	await selectCircleTool(page);
	await canvas.click({ position: { x: 200, y: 200 } });
	await expect(canvas.locator('circle:not(.overlay,.trace)')).toBeVisible();

	// select rect
	await canvas.click({ position: { x: 12, y: 12 }, modifiers: ['Shift'] });
	await expect(canvas.locator('rect.selection-rect')).toBeVisible();

	// select circle
	await canvas.click({ position: { x: 202, y: 202 }, modifiers: ['Shift'] });

	const selectionRectCount = await canvas.locator('rect.selection-rect').count();
	await expect(selectionRectCount).toBe(2);

	await page.keyboard.press('Delete');

	await expect(canvas.locator('rect')).not.toBeVisible();
	await expect(canvas.locator('circle')).not.toBeVisible();
});
