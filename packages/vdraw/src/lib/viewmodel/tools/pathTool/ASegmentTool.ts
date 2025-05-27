import type { SegmentTool } from './SegmentTool.js';
import {
	distanceOfLastSegment,
	getLastSegment,
	type ASegment,
	type Path
} from '$lib/model/shapes/path/Path.js';

export class ASegmentTool implements SegmentTool {
	createSegment(x: number, y: number): ASegment {
		return { c: 'A', x, y, rx: 10, ry: 10, xRotation: 0, largeArcFlag: 0, sweepFlag: 0 };
	}

	convertSegment(segment: ASegment, x: number, y: number): void {
		segment.x = x;
		segment.y = y;
		if (segment.c !== 'A') {
			segment.c = 'A';
			segment.rx = 10;
			segment.ry = 10;
			segment.xRotation = 0;
			segment.largeArcFlag = 0;
			segment.sweepFlag = 0;
		}
	}

	updateSegment(segment: ASegment, x: number, y: number): void {
		segment.x = x;
		segment.y = y;
	}

	onkeydown(key: string, path: Path | null): void {
		const lastSegment = getLastSegment(path);
		if (!lastSegment || lastSegment.c !== 'A') {
			return;
		}

		let r = 0; // circle radius

		switch (true) {
			case key === 'ArrowRight':
				lastSegment.rx *= 1.02;
				break;
			case key === 'ArrowLeft':
				lastSegment.rx *= 0.98;
				break;
			case key === 'ArrowUp':
				r = distanceOfLastSegment(path!) / 2;
				if (r > lastSegment.rx) {
					lastSegment.largeArcFlag = 0;
					lastSegment.ry = r;
					lastSegment.rx = r;
				}
				if (lastSegment.largeArcFlag === 1) {
					lastSegment.ry *= 0.98;
					lastSegment.rx *= 0.98;
				} else {
					lastSegment.ry *= 1.02;
					lastSegment.rx *= 1.02;
				}
				break;
			case key === 'ArrowDown':
				r = distanceOfLastSegment(path!) / 2;
				if (r > lastSegment.rx) {
					lastSegment.largeArcFlag = 1;
					lastSegment.ry = r;
					lastSegment.rx = r;
				}
				if (lastSegment.largeArcFlag === 0) {
					lastSegment.ry *= 0.98;
					lastSegment.rx *= 0.98;
				} else {
					lastSegment.ry *= 1.02;
					lastSegment.rx *= 1.02;
				}
				break;
			case key === '=':
				lastSegment.xRotation += 5;
				break;
			case key === '-':
				lastSegment.xRotation -= 5;
				break;
			case key === 'Tab':
				lastSegment.sweepFlag = lastSegment.sweepFlag === 0 ? 1 : 0;
				break;
		}
	}
}
