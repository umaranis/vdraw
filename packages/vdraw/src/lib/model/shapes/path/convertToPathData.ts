import type { Segment } from './Path.js';

export function convertToPathData(path: Array<Segment>) {
	return path
		.map((point) => {
			switch (point.c) {
				case 'M':
				case 'm':
					return `${point.c}${point.x},${point.y}`;
				case 'L':
				case 'l':
					return `${point.c}${point.x},${point.y}`;
				case 'H':
				case 'h':
					return `${point.c}${point.x}`;
				case 'V':
				case 'v':
					return `${point.c}${point.y}`;
				case 'C':
				case 'c':
					return `${point.c}${point.x1},${point.y1} ${point.x2},${point.y2} ${point.x},${point.y}`;
				case 'S':
				case 's':
					return `${point.c}${point.x2},${point.y2} ${point.x},${point.y}`;
				case 'Q':
				case 'q':
					return `${point.c}${point.x1},${point.y1} ${point.x},${point.y}`;
				case 'T':
				case 't':
					return `${point.c}${point.x},${point.y}`;
				case 'A':
				case 'a':
					return `${point.c}${point.rx},${point.ry} ${point.xRotation} ${point.largeArcFlag} ${point.sweepFlag} ${point.x},${point.y}`;
				case 'Z':
				case 'z':
					return point.c;
			}
		})
		.join(' ');
}
