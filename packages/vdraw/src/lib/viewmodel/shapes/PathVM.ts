import PathView from '$lib/view/shapes/PathView.svelte';
import PathSelection from '$lib/view/selection/PathSelection.svelte';
import PathStrokeTrace from '$lib/view/selection/PathStrokeTrace.svelte';
import type { ShapeVM } from './ShapeVM.js';
import { move } from '$lib/model/shapes/path/Path.js';

export function createPathVM(): ShapeVM {
	return {
		component: PathView,
		strokeTrace: PathStrokeTrace,
		selection: PathSelection,
		move
	};
}
