import type { Shape } from '$lib/model/shapes/Shape.js';
import { createToolPalette, type ToolPalette } from '$lib/viewmodel/tools/ToolPalette.js';
import { SvelteSet } from 'svelte/reactivity';

export interface Canvas {
	shapes: Shape[];
	toolPalette: ToolPalette;
	selected: Set<Shape>;
	viewBox: { x: number; y: number; zoom: number };
}

export function createCanvas(): Canvas {
	return {
		shapes: [],
		toolPalette: createToolPalette(),
		selected: new SvelteSet(),
		viewBox: { x: 0, y: 0, zoom: 1 }
	};
}
