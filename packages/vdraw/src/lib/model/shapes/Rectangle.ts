import type { Shape } from './Shape.js';

export interface Rectangle extends Shape {
	type: 'rect';
	x: number;
	y: number;
	width: number;
	height: number;
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
}

export function move(shape: Rectangle, dx: number, dy: number) {
	shape.x += dx;
	shape.y += dy;
}
