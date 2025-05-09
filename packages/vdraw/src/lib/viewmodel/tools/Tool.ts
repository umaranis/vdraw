import { CanvasViewModel } from '../canvas/CanvasVM.svelte.js';

export interface Tool {
	onmousedown(e: MouseEvent, canvasVM: CanvasViewModel): void;
}
