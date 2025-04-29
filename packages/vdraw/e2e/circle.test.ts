import { expect, test } from '@playwright/test';
import { getCanvasLocator, selectCircleTool } from './helpers';

test('circle - create', async ({ page }) => {
	await page.goto('/');
	const canvas = getCanvasLocator(page);

	// no circles yet
	await expect(canvas.locator('circle')).not.toBeVisible();

	// add one circle
	await selectCircleTool(page);
	await canvas.click();
	await expect(canvas.locator('circle:not(.overlay,.trace)')).toBeVisible();
});
