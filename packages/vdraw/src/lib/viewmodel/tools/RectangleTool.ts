import type { Tool } from '$lib/viewmodel/tools/Tool.js';
import type { CanvasSelectionVM } from '$lib/viewmodel/canvas/CanvasSelectionVM.svelte.js';

export class RectangleTool implements Tool {
	onmousedown(e: MouseEvent, canvasVM: CanvasSelectionVM) {
		const rect = {
			type: 'rect',
			selected: false,
			x: e.offsetX,
			y: e.offsetY,
			width: 100,
			height: 100,
			fill: 'red',
			stroke: 'black',
			strokeWidth: 8
		};
		canvasVM.canvas.shapes.push(rect);
		canvasVM.toolPalette.switchToDefault();
	}
}
