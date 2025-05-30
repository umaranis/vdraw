import type { Tool } from './Tool.js';
import type { CanvasViewModel } from '../canvas/CanvasVM.svelte.js';

export class SelectionTool implements Tool {
	onmousedown(e: MouseEvent, canvasVM: CanvasViewModel): void {
		canvasVM.clearSelection();
	}

	captureMouseMove = false;
	onmousemove(): void {}
	captureKeyboard = false;
	onkeydown(): void {}
	captureMouseDownOnShape = false;
	onmousedownOnShape(): void {}
}
