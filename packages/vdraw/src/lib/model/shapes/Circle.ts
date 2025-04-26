import type { Shape } from './Shape.js';

export interface CircleType extends Shape {
	x: number;
	y: number;
	radius: number;
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
}
