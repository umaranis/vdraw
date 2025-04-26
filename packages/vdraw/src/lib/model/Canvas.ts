import type { Shape } from '$lib/model/shapes/Shape.js';
import { createToolPalette, type ToolPalette } from '$lib/model/tools/ToolPalette.js';
import { SvelteSet } from 'svelte/reactivity';

export interface Canvas {
	shapes: Shape[];
	toolPalette: ToolPalette;
	selected: Set<Shape>;
}

export function createCanvas(): Canvas {
	return {
		shapes: [],
		toolPalette: createToolPalette(),
		selected: new SvelteSet()
	};
}
