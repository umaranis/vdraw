import { expect, test } from '@playwright/test';
import { getCanvasLocator } from './helpers';

test('circle - create', async ({ page }) => {
	await page.goto('/');
	const canvas = getCanvasLocator(page);

	// no circles yet
	await expect(canvas.locator('circle')).not.toBeVisible();

	// add one circle
	await page.click('button[aria-label="Circle Tool"]');
	await canvas.click();
	await expect(canvas.locator('circle')).toBeVisible();
});
