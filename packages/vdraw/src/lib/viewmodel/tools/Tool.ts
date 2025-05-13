import type { CanvasViewModel } from '../canvas/CanvasVM.svelte.js';
import type { Shape } from '../../model/shapes/Shape.js';

export interface Tool {
	onmousedown(e: MouseEvent, canvasVM: CanvasViewModel): void;

	captureMouseMove: boolean;
	onmousemove(e: MouseEvent, canvasVM: CanvasViewModel): void;

	captureKeyboard: boolean;
	onkeydown(e: KeyboardEvent, canvasVM: CanvasViewModel): void;

	captureMouseDownOnShape: boolean;
	onmousedownOnShape(e: MouseEvent, canvasVM: CanvasViewModel, shape: Shape): void;
}
