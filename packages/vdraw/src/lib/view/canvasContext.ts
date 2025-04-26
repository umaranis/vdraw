import { getContext, setContext } from 'svelte';
import type { Canvas } from '$lib/model/Canvas.js';

export function setCanvas(canvas: Canvas) {
	setContext('canvas', canvas);
}

export function getCanvas(): Canvas {
	return getContext('canvas');
}
