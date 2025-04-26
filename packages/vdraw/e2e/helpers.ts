import type { Page } from '@playwright/test';

export function getCanvasLocator(page: Page) {
	return page.locator('svg[tabIndex="0"]');
}
