import type { CanvasViewModel } from '../../canvas/CanvasVM.svelte.js';
import type { Tool } from '../Tool.js';
import { getLastSegment, type Path } from '../../../model/shapes/path/Path.js';
import { LSegmentTool } from './LSegmentTool.js';
import { HSegmentTool } from './HSegmentTool.js';
import { VSegmentTool } from './VSegmentTool.js';
import { ASegmentTool } from './ASegmentTool.js';
import type { SegmentTool } from './SegmentTool.js';

export class PathTool implements Tool {
	private lineSegmentTool = new LSegmentTool();
	private horizontalSegmentTool = new HSegmentTool();
	private verticalSegmentTool = new VSegmentTool();
	private arcSegmentTool = new ASegmentTool();

	private lastMousePoint = { x: 0, y: 0 };

	currentPath: Path | null = null;
	captureMouseMove = false;
	captureKeyboard = false;
	captureMouseDownOnShape = false;
	currentSegmentTool: SegmentTool = this.lineSegmentTool;

	onmousedown(e: MouseEvent, canvasVM: CanvasViewModel) {
		this.updateLastPoint(e, canvasVM);
		const { x, y } = this.lastMousePoint;
		if (!this.currentPath) {
			const path: Path = {
				type: 'path',
				segments: [{ c: 'M', x: x, y: y }, this.currentSegmentTool.createSegment(x, y)],
				fill: 'none',
				stroke: 'black',
				strokeWidth: 8
			};
			const index = canvasVM.canvas.shapes.push(path);
			this.currentPath = canvasVM.canvas.shapes[index - 1] as Path;
			this.captureMouseMove = true;
			this.captureKeyboard = true;
			this.captureMouseDownOnShape = true;
		} else {
			this.currentSegmentTool = this.lineSegmentTool;
			this.currentPath.segments.push(this.currentSegmentTool.createSegment(x, y));
		}
	}

	onmousemove(e: MouseEvent, canvasVM: CanvasViewModel) {
		this.updateLastPoint(e, canvasVM);
		const { x, y } = this.lastMousePoint;
		const lastSegment = getLastSegment(this.currentPath);
		if (lastSegment) {
			this.currentSegmentTool.updateSegment(lastSegment, x, y);
		}
	}

	onkeydown(e: KeyboardEvent, canvasVM: CanvasViewModel): void {
		e.preventDefault();

		switch (e.key) {
			case 'Escape':
				this.currentPath?.segments.pop();
				if (this.currentPath?.segments.length === 1) {
					canvasVM.canvas.shapes.pop();
				}
				this.currentPath = null;
				this.captureMouseMove = false;
				this.captureKeyboard = false;
				this.captureMouseDownOnShape = false;
				this.currentSegmentTool = this.lineSegmentTool;
				canvasVM.toolPalette.switchToDefault();
				break;
			case 'H':
			case 'h':
				this.updateSegmentTool(this.horizontalSegmentTool);
				break;
			case 'V':
			case 'v':
				this.updateSegmentTool(this.verticalSegmentTool);
				break;
			case 'L':
			case 'l':
				this.updateSegmentTool(this.lineSegmentTool);
				break;
			case 'A':
			case 'a':
				this.updateSegmentTool(this.arcSegmentTool);
				break;
			default:
				this.currentSegmentTool.onkeydown(e.key, this.currentPath);
				break;
		}
	}

	private updateSegmentTool(tool: SegmentTool) {
		this.currentSegmentTool = tool;
		const lastSegment = getLastSegment(this.currentPath);
		if (lastSegment) {
			this.currentSegmentTool.convertSegment(
				lastSegment,
				this.lastMousePoint.x,
				this.lastMousePoint.y
			);
		}
	}

	onmousedownOnShape(e: MouseEvent, canvasVM: CanvasViewModel): void {
		this.onmousedown(e, canvasVM);
	}

	private updateLastPoint(e: MouseEvent, canvasVM: CanvasViewModel) {
		this.lastMousePoint.x = canvasVM.convertXToViewBox(e.offsetX);
		this.lastMousePoint.y = canvasVM.convertYToViewBox(e.offsetY);
	}
}
