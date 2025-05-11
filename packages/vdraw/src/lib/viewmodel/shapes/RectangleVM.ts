import RectView from '$lib/view/shapes/RectView.svelte';
import RectSelection from '$lib/view/selection/RectSelection.svelte';
import RectStrokeTrace from '$lib/view/selection/RectStrokeTrace.svelte';
import type { ShapeVM } from './ShapeVM.js';
import { move } from '$lib/model/shapes/Rectangle.js';

export function createRectangleVM(): ShapeVM {
	return {
		component: RectView,
		strokeTrace: RectStrokeTrace,
		selection: RectSelection,
		move
	};
}
