import type { Component } from 'svelte';
import RectView from '$lib/view/shapes/RectView.svelte';
import RectSelection from '$lib/view/selection/RectSelection.svelte';
import CircleView from '$lib/view/shapes/CircleView.svelte';
import CircleSelection from '$lib/view/selection/CircleSelection.svelte';
import RectStrokeTrace from './selection/RectStrokeTrace.svelte';
import CircleStrokeTrace from './selection/CircleStrokeTrace.svelte';

export interface ModelViewMap {
	[key: string]: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		component: Component<any>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		strokeTrace: Component<any>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		selection: Component<any>;
	};
}

export function createModelViewMap(): ModelViewMap {
	return {
		rect: { component: RectView, strokeTrace: RectStrokeTrace, selection: RectSelection },
		circle: { component: CircleView, strokeTrace: CircleStrokeTrace, selection: CircleSelection }
	};
}
