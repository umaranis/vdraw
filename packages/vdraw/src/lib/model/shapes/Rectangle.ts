import type { Shape } from './Shape.js';

export interface RectangleType extends Shape {
	type: 'rect';
	x: number;
	y: number;
	width: number;
	height: number;
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
}
