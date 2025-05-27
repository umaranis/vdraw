import type { SegmentTool } from './SegmentTool.js';
import type { VSegment } from '$lib/model/shapes/path/Path.js';

export class VSegmentTool implements SegmentTool {
	createSegment(y: number): VSegment {
		return { c: 'V', y };
	}

	convertSegment(segment: VSegment, x: number, y: number): void {
		segment.c = 'V';
		segment.y = y;
	}

	updateSegment(segment: VSegment, x: number, y: number): void {
		segment.y = y;
	}

	onkeydown(): void {}
}
