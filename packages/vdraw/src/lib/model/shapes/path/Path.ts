import type { Shape } from '../Shape.js';
import { distance } from './pathGeometry.js';

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

export interface Path extends Shape {
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
export function move(shape: Path, dx: number, dy: number) {
	for (const segment of shape.segments) {
		if ('x' in segment) {
			segment.x += dx;
		}
		if ('y' in segment) {
			segment.y += dy;
		}
		if (isC(segment) || isS(segment) || isQ(segment)) {
			if ('x1' in segment) segment.x1 += dx;
			if ('y1' in segment) segment.y1 += dy;
			if ('x2' in segment) segment.x2 += dx;
			if ('y2' in segment) segment.y2 += dy;
		}
	}
}

export function isAbsolute(segment: Segment) {
	return segment.c === segment.c.toUpperCase();
}

export function isRelative(segment: Segment) {
	return segment.c === segment.c.toLowerCase();
}

export function isM(segment: Segment): segment is MSegment {
	return segment.c === 'M' || segment.c === 'm';
}

export function isL(segment: Segment): segment is LSegment {
	return segment.c === 'L' || segment.c === 'l';
}

export function isH(segment: Segment): segment is HSegment {
	return segment.c === 'H' || segment.c === 'h';
}

export function isV(segment: Segment): segment is VSegment {
	return segment.c === 'V' || segment.c === 'v';
}

export function isC(segment: Segment): segment is CSegment {
	return segment.c === 'C' || segment.c === 'c';
}

export function isS(segment: Segment): segment is SSegment {
	return segment.c === 'S' || segment.c === 's';
}

export function isQ(segment: Segment): segment is QSegment {
	return segment.c === 'Q' || segment.c === 'q';
}

export function isT(segment: Segment): segment is TSegment {
	return segment.c === 'T' || segment.c === 't';
}

export function isA(segment: Segment): segment is ASegment {
	return segment.c === 'A' || segment.c === 'a';
}

export function isZ(segment: Segment): segment is ZSegment {
	return segment.c === 'Z' || segment.c === 'z';
}

export function getX(path: Path, segmentIndex: number) {
	const segment = path.segments[segmentIndex];
	switch (true) {
		case isV(segment):
			// eslint-disable-next-line no-case-declarations
			let previousPath = path.segments[segmentIndex - 1];
			while (previousPath && isV(previousPath)) {
				previousPath = path.segments[segmentIndex - 1];
			}
			return isZ(previousPath) ? null : previousPath.x;
		case isZ(segment):
			return null;
		default:
			return segment.x;
	}
}

export function getY(path: Path, segmentIndex: number) {
	const segment = path.segments[segmentIndex];
	switch (true) {
		case isH(segment):
			// eslint-disable-next-line no-case-declarations
			let previousPath = path.segments[segmentIndex - 1];
			while (previousPath && isH(previousPath)) {
				previousPath = path.segments[segmentIndex - 1];
			}
			return isZ(previousPath) ? null : previousPath.y;
		case isZ(segment):
			return null;
		default:
			return segment.y;
	}
}

export function getLastSegment(path: Path | null) {
	return path?.segments[path.segments.length - 1];
}

/**
 * Returns the shortest distance between the start and end points of the last segment.
 */
export function distanceOfLastSegment(path: Path) {
	const lastSegment = getLastSegment(path);
	if (!lastSegment) {
		return 0;
	}
	if (lastSegment.c === 'M' || lastSegment.c === 'm') {
		return 0;
	}
	const prevSegment = path.segments[path.segments.length - 2];
	if (!prevSegment) {
		return 0;
	}

	const x1 = getX(path, path.segments.length - 2);
	const y1 = getY(path, path.segments.length - 2);
	const x2 = getX(path, path.segments.length - 1);
	const y2 = getY(path, path.segments.length - 1);

	if (x1 === null || y1 === null || x2 === null || y2 === null) {
		return 0;
	}

	return distance(x1, y1, x2, y2);
}

// export function convertToRelative(path: Path, segmentIndex: number) {
// 	const segment = path.segments[segmentIndex];
// 	if (isAbsolute(segment)) {
// 		const prevSegment = path.segments[segmentIndex - 1];
// 		segment.c = segment.c.toLowerCase() as Command;
// 		if (prevSegment) {
// 			if ('x' in segment && 'x' in prevSegment) {
// 				segment.x -= prevSegment.x;
// 			}
// 			if ('y' in segment && 'y' in prevSegment) {
// 				segment.y -= prevSegment.y;
// 			}
// 		}
// 	}
// }
