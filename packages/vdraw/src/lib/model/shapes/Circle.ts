import type { Shape } from './Shape.js';

export interface CircleType extends Shape {
	type: 'circle';
	x: number;
	y: number;
	radius: number;
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
}

export function move(shape: CircleType, dx: number, dy: number) {
	shape.x += dx;
	shape.y += dy;
}
