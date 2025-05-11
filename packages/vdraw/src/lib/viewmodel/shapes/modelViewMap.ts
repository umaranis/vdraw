import type { ShapeVM } from './ShapeVM.js';
import { createCircleVM } from './CircleVM.js';
import { createRectangleVM } from './RectangleVM.js';
import { createPathVM } from './PathVM.js';

export interface ModelViewMap {
	[key: string]: ShapeVM;
}

export function createModelViewMap(): ModelViewMap {
	return {
		rect: createRectangleVM(),
		circle: createCircleVM(),
		path: createPathVM()
	};
}
