import type { SegmentTool } from './SegmentTool.js';
import type { HSegment } from '$lib/model/shapes/path/Path.js';

export class HSegmentTool implements SegmentTool {
	createSegment(x: number): HSegment {
		return { c: 'H', x };
	}

	convertSegment(segment: HSegment, x: number): void {
		segment.c = 'H';
		segment.x = x;
	}

	updateSegment(segment: HSegment, x: number): void {
		segment.x = x;
	}

	onkeydown(): void {}
}
