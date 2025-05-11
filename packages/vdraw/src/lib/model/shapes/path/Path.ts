import type { Shape } from '../Shape.js';

export type Command =
	| 'M' // moveto
	| 'm' // moveto relative
	| 'L' // lineto
	| 'l' // lineto relative
	| 'H' // horizontal lineto
	| 'h' // horizontal lineto relative
	| 'V' // vertical lineto
	| 'v' // vertical lineto relative
	| 'C' // cubic curveto
	| 'c' // cubic curveto relative
	| 'S' // smooth cubic curveto
	| 's' // smooth cubic curveto relative
	| 'Q' // quadratic Bézier curveto
	| 'q' // quadratic Bézier curveto relative
	| 'T' // smooth quadratic Bézier curveto
	| 't' // smooth quadratic Bézier curveto relative
	| 'A' // elliptical arc
	| 'a' // elliptical arc relative
	| 'Z' // closepath
	| 'z'; // closepath

export type MSegment = { c: 'M' | 'm'; x: number; y: number };
export type LSegment = { c: 'L' | 'l'; x: number; y: number };
export type HSegment = { c: 'H' | 'h'; x: number };
export type VSegment = { c: 'V' | 'v'; y: number };
export type CSegment = {
	c: 'C' | 'c';
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	x: number;
	y: number;
};
export type SSegment = { c: 'S' | 's'; x2: number; y2: number; x: number; y: number };
export type QSegment = { c: 'Q' | 'q'; x1: number; y1: number; x: number; y: number };
export type TSegment = { c: 'T' | 't'; x: number; y: number };
export type ASegment = {
	c: 'A' | 'a';
	rx: number;
	ry: number;
	xRotation: number;
	largeArcFlag: number;
	sweepFlag: number;
	x: number;
	y: number;
};
export type ZSegment = { c: 'Z' | 'z' };

export type Segment =
	| MSegment
	| LSegment
	| HSegment
	| VSegment
	| CSegment
	| SSegment
	| QSegment
	| TSegment
	| ASegment
	| ZSegment;

export interface PathType extends Shape {
	type: 'path';
	segments: Segment[];
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
}

/**
 * Moves the path by the given amount.
 * Only the first segment is moved assuming the rest is relative.
 */
export function move(shape: PathType, dx: number, dy: number) {
	if ((shape.segments.length > 0 && shape.segments[0].c === 'M') || shape.segments[0].c === 'm') {
		shape.segments[0].x += dx;
		shape.segments[0].y += dy;
	}
}
