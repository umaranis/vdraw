import type { Path, Segment } from '$lib/model/shapes/path/Path.js';

export type SegmentTool = {
	createSegment(x: number, y: number): Segment;
	convertSegment(segment: Segment, x: number, y: number): void;
	updateSegment(segment: Segment, x: number, y: number): void;
	onkeydown(key: string, path: Path | null): void;
};
