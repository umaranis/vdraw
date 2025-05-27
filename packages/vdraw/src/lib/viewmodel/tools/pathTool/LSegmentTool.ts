import type { SegmentTool } from './SegmentTool.js';
import { type LSegment } from '$lib/model/shapes/path/Path.js';

export class LSegmentTool implements SegmentTool {
	createSegment(x: number, y: number): LSegment {
		return { c: 'L', x, y };
	}

	convertSegment(segment: LSegment, x: number, y: number): void {
		segment.c = 'L';
		segment.x = x;
		segment.y = y;
	}

	updateSegment(segment: LSegment, x: number, y: number): void {
		segment.x = x;
		segment.y = y;
	}

	onkeydown(): void {}
}
