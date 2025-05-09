import type { Tool } from './Tool.js';
import type { CanvasSelectionVM } from '../canvas/CanvasSelectionVM.svelte.js';

export class SelectionTool implements Tool {
	onmousedown(e: MouseEvent, canvasVM: CanvasSelectionVM): void {
		canvasVM.clearSelection();
	}
}
