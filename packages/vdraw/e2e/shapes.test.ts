import { expect, test } from '@playwright/test';
import { getCanvasLocator, selectTool } from './helpers';

const shapes: Array<'rect' | 'circle'> = ['rect', 'circle'];

test.describe('shapes - basic tests', () => {
	shapes.forEach((shape) => {
		test(`${shape} - create`, async ({ page }) => {
			await page.goto('/');
			const canvas = getCanvasLocator(page);

			// no rectangles yet
			await expect(canvas.locator(shape)).not.toBeVisible();

			// add one rect
			await selectTool(page, shape);
			await canvas.click();
			await expect(canvas.locator(`${shape}:not(.overlay,.trace)`)).toBeVisible();
		});

		test(`${shape} - select by clicking overlay`, async ({ page }) => {
			await page.goto('/');
			const canvas = getCanvasLocator(page);

			// no rectangles yet
			await expect(canvas.locator(shape)).not.toBeVisible();

			// add one rect
			await selectTool(page, shape);
			await canvas.click();
			await expect(canvas.locator(`${shape}:not(.overlay,.trace)`)).toBeVisible();

			// select rect
			await canvas.locator(`${shape}.overlay`).click();
			const rectCount = await canvas.locator('rect').count();
			expect(rectCount).toBeGreaterThan(4);
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

		test(`${shape} - de-select using escape key`, async ({ page }) => {
			await page.goto('/');
			const canvas = getCanvasLocator(page);

			// no rectangles yet
			await expect(canvas.locator(`${shape}`)).not.toBeVisible();

			// add one rect
			await selectTool(page, shape);
			await canvas.click();
			await expect(canvas.locator(`${shape}:not(.overlay,.trace)`)).toBeVisible();

			// select rect
			await canvas.locator(`${shape}.overlay`).click();
			expect(canvas.locator(`rect.selection-rect`)).toBeVisible();

			// de-select rect
			await page.keyboard.press('Escape');
			expect(canvas.locator(`${shape}.selection-rect`)).not.toBeVisible();
		});

		test(`${shape} - de-select using canvas click`, async ({ page }) => {
			await page.goto('/');
			const canvas = getCanvasLocator(page);

			// no rectangles yet
			await expect(canvas.locator(`${shape}`)).not.toBeVisible();

			// add one rect
			await selectTool(page, shape);
			await canvas.click();
			await expect(canvas.locator(`${shape}:not(.overlay,.trace)`)).toBeVisible();

			// select rect
			await canvas.locator(`${shape}.overlay`).click();
			expect(canvas.locator(`rect.selection-rect`)).toBeVisible();

			// de-select rect
			await canvas.click({ position: { x: 500, y: 500 } });
			expect(canvas.locator(`${shape}.selection-rect`)).not.toBeVisible();
		});

		test(`${shape} - delete using backspace`, async ({ page }) => {
			await page.goto('/');
			const canvas = getCanvasLocator(page);

			// no shapes yet
			await expect(canvas.locator(`${shape}`)).not.toBeVisible();

			// add one shape
			await selectTool(page, shape);
			await canvas.click();
			await expect(canvas.locator(`${shape}:not(.overlay,.trace)`)).toBeVisible();

			// select rect
			await canvas.locator(`${shape}.overlay`).click();
			expect(canvas.locator(`rect.selection-rect`)).toBeVisible();

			// delete rect
			await page.keyboard.press('Backspace');
			await expect(canvas.locator(`${shape}`)).not.toBeVisible();
		});

		test(`${shape} - delete using delete key`, async ({ page }) => {
			await page.goto('/');
			const canvas = getCanvasLocator(page);

			// no rectangles yet
			await expect(canvas.locator(`${shape}`)).not.toBeVisible();

			// add one rect
			await selectTool(page, shape);
			await canvas.click();
			await expect(canvas.locator(`${shape}:not(.overlay,.trace)`)).toBeVisible();

			// select rect
			await canvas.locator(`${shape}.overlay`).click();
			expect(canvas.locator(`rect.selection-rect`)).toBeVisible();

			// delete rect
			await page.keyboard.press('Delete');
			await expect(canvas.locator(`${shape}`)).not.toBeVisible();
		});
	});
});
