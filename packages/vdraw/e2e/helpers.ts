import type { Page } from '@playwright/test';

export function getCanvasLocator(page: Page) {
	return page.locator('svg[tabIndex="0"]');
}

export function selectRectangleTool(page: Page) {
	return page.click('button[aria-label="Rectangle Tool"]');
}

export function selectCircleTool(page: Page) {
	return page.click('button[aria-label="Circle Tool"]');
}

export function selectTool(page: Page, tool: 'rect' | 'circle') {
	return tool === 'rect' ? selectRectangleTool(page) : selectCircleTool(page);
}
