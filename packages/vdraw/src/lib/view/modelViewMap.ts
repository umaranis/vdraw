import type { Component } from 'svelte';
import RectView from '$lib/view/shapes/RectView.svelte';
import RectSelection from '$lib/view/selection/RectSelection.svelte';
import CircleView from '$lib/view/shapes/CircleView.svelte';
import CircleSelection from '$lib/view/selection/CircleSelection.svelte';

export interface ModelViewMap {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: Component<any>;
}

export function createModelViewMap(): ModelViewMap {
	return {
		rect: RectView,
		circle: CircleView
	};
}

export function createModelSelectionViewMap(): ModelViewMap {
	return {
		rect: RectSelection,
		circle: CircleSelection
	};
}
