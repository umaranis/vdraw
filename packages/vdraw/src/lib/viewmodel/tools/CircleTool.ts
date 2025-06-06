import type { CanvasViewModel } from '../canvas/CanvasVM.svelte.js';
import type { Tool } from './Tool.js';

export class CircleTool implements Tool {
	onmousedown(e: MouseEvent, canvasVM: CanvasViewModel) {
		const circle = {
			type: 'circle',
			x: canvasVM.convertXToViewBox(e.offsetX),
			y: canvasVM.convertYToViewBox(e.offsetY),
			radius: 50,
			fill: 'blue',
			stroke: 'black',
			strokeWidth: 8
		};
		canvasVM.canvas.shapes.push(circle);
		canvasVM.toolPalette.switchToDefault();
	}

	captureMouseMove = false;
	onmousemove(): void {}
	captureKeyboard = false;
	onkeydown(): void {}
	captureMouseDownOnShape = false;
	onmousedownOnShape(): void {}
}
