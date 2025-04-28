import type { Canvas } from '$lib/model/Canvas.js';
import type { Tool } from '$lib/model/tools/Tool.js';

export class RectangleTool implements Tool {
	onclick(e: MouseEvent, canvas: Canvas) {
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
		canvas.shapes.push(rect);
	}
}
