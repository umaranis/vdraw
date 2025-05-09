import { CanvasSelectionVM } from '../canvas/CanvasSelectionVM.svelte';

export interface Tool {
	onmousedown(e: MouseEvent, canvasVM: CanvasSelectionVM): void;
}
