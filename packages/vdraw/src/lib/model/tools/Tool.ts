import type { Canvas } from '$lib/model/Canvas.js';

export interface Tool {
	onclick(e: MouseEvent, canvas: Canvas): void;
}
