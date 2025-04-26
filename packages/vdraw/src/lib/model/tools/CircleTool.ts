import type { Canvas } from '../Canvas.js';
import type { Tool } from './Tool.js';

export class CircleTool implements Tool {
	onclick(e: MouseEvent, canvas: Canvas) {
		const circle = {
			type: 'circle',
			selected: false,
			x: e.offsetX,
			y: e.offsetY,
			radius: 50,
			fill: 'blue',
			stroke: 'black',
			strokeWidth: 1
		};
		canvas.shapes.push(circle);
	}
}
