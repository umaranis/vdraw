import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, fireEvent } from '@testing-library/svelte';
import CanvasView from './CanvasView.svelte';
describe('CanvasView.svelte', () => {
	test('should have correct SVG dimensions', () => {
		render(CanvasView);
		const svg = document.getElementsByTagName('svg')[0];

		expect(svg).toHaveAttribute('width');
		expect(svg).toHaveAttribute('height');
	});

	test('should be blank', async () => {
		render(CanvasView);
		const svg = document.getElementsByTagName('svg')[0];
		// Add assertions based on expected behavior
		expect(svg.getElementsByTagName('rect')).toHaveLength(0);
	});

	test('should respond to mouse click', async () => {
		render(CanvasView);
		const svg = document.getElementsByTagName('svg')[0];

		await fireEvent.click(svg, { clientX: 100, clientY: 100 });
		// Add assertions based on expected behavior
		expect(document.getElementsByTagName('rect')).toHaveLength(1);
	});

	// *** jsdom (and happy-dom) doesn't support svg rendering logic.
	// *** There is basic support for svg elements like rect.
	// *** For instance, click event is working for 'svg', but not for 'rect'.
	//
	// test('should render rect', async () => {
	// 	render(CanvasView);
	// 	const svg = document.getElementsByTagName('svg')[0];
	// 	await fireEvent.click(svg, { clientX: 100, clientY: 100 });
	// 	const rect = document.getElementsByTagName('svg')[0];
	// 	await fireEvent.click(rect, { clientX: 100, clientY: 100 });
	// });
});
