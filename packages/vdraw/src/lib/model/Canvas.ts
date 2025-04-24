import type { Shape } from '$lib/model/shapes/Shape.js';
import { createToolPalette, type ToolPalette } from '$lib/model/tools/ToolPalette.js';
import { SvelteSet } from 'svelte/reactivity';

export interface Canvas {
	shapes: Shape[];
	toolPalette: ToolPalette;
	selected: Set<Shape>;
}

export function createCanvas(): Canvas {
	const r1 = {
		type: 'rect',
		selected: false,
		x: 10,
		y: 10,
		width: 50,
		height: 50,
		fill: 'red',
		stroke: 'black',
		strokeWidth: 1
	};
	return {
		shapes: [r1],
		toolPalette: createToolPalette(),
		selected: new SvelteSet()
	};
}
