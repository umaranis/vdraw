import type { Tool } from './Tool.js';
import type { CanvasViewModel } from '../canvas/CanvasVM.svelte.js';
import type { RectangleType } from '../../model/shapes/Rectangle.js';

export class RectangleTool implements Tool {
	onmousedown(e: MouseEvent, canvasVM: CanvasViewModel) {
		const rect: RectangleType = {
			type: 'rect',
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

	captureMouseMove = false;
	onmousemove(): void {}
	captureKeyboard = false;
	onkeydown(): void {}
}
