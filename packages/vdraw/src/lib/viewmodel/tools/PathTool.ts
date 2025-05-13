import type { CanvasViewModel } from '../canvas/CanvasVM.svelte.js';
import type { Tool } from './Tool.js';
import type { Path } from '../../model/shapes/path/Path.js';

export class PathTool implements Tool {
	currentPath: Path | null = null;
	captureMouseMove = false;
	captureKeyboard = false;
	captureMouseDownOnShape = false;
	currentCommand: 'L' | 'T' = 'L';

	onmousedown(e: MouseEvent, canvasVM: CanvasViewModel) {
		if (!this.currentPath) {
			const path: Path = {
				type: 'path',
				segments: [
					{ c: 'M', x: e.offsetX, y: e.offsetY },
					{ c: 'L', x: e.offsetX, y: e.offsetY }
				],
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
			this.currentPath.segments.push({ c: this.currentCommand, x: e.offsetX, y: e.offsetY });
		}
	}

	onmousemove(e: MouseEvent) {
		if (this.currentPath) {
			const lastSegment = this.currentPath.segments[this.currentPath.segments.length - 1];
			if (lastSegment.c === 'L') {
				lastSegment.x = e.offsetX;
				lastSegment.y = e.offsetY;
			} else if (lastSegment.c === 'T') {
				lastSegment.x = e.offsetX;
				lastSegment.y = e.offsetY;
			}
		}
	}

	onkeydown(e: KeyboardEvent, canvasVM: CanvasViewModel): void {
		if (e.key === 'Escape') {
			this.currentPath?.segments.pop();
			if (this.currentPath?.segments.length === 1) {
				canvasVM.canvas.shapes.pop();
			}
			this.currentPath = null;
			this.captureMouseMove = false;
			this.captureKeyboard = false;
			this.captureMouseDownOnShape = false;
			this.currentCommand = 'L';
			canvasVM.toolPalette.switchToDefault();
		} else if (e.key === 'Tab') {
			e.preventDefault();
			this.currentCommand = this.currentCommand === 'L' ? 'T' : 'L';
		}
	}

	onmousedownOnShape(e: MouseEvent, canvasVM: CanvasViewModel): void {
		this.onmousedown(e, canvasVM);
	}
}
