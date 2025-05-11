import type { Shape } from '$lib/model/shapes/Shape.js';
import type { Component } from 'svelte';

export interface ShapeVM {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: Component<any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	strokeTrace: Component<any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	selection: Component<any>;
	move(shape: Shape, dx: number, dy: number): void;
}
