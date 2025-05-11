import CircleView from '$lib/view/shapes/CircleView.svelte';
import CircleSelection from '$lib/view/selection/CircleSelection.svelte';
import CircleStrokeTrace from '$lib/view/selection/CircleStrokeTrace.svelte';
import type { ShapeVM } from './ShapeVM.js';
import { move } from '$lib/model/shapes/Circle.js';

export function createCircleVM(): ShapeVM {
	return {
		component: CircleView,
		strokeTrace: CircleStrokeTrace,
		selection: CircleSelection,
		move
	};
}
