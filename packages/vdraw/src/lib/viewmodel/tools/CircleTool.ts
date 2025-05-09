import type { CanvasSelectionVM } from '../canvas/CanvasSelectionVM.svelte.js';
import type { Tool } from './Tool.js';

export class CircleTool implements Tool {
	onmousedown(e: MouseEvent, canvasVM: CanvasSelectionVM) {
		const circle = {
			type: 'circle',
			selected: false,
			x: e.offsetX,
			y: e.offsetY,
			radius: 50,
			fill: 'blue',
			stroke: 'black',
			strokeWidth: 8
		};
		canvasVM.canvas.shapes.push(circle);
		canvasVM.canvas.toolPalette.switchToDefault();
	}
}
