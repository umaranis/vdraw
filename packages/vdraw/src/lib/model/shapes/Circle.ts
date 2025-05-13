import type { Shape } from './Shape.js';

export interface Circle extends Shape {
	type: 'circle';
	x: number;
	y: number;
	radius: number;
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
}

export function move(shape: Circle, dx: number, dy: number) {
	shape.x += dx;
	shape.y += dy;
}
