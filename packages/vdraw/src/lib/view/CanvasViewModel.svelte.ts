import type { Shape } from '$lib/model/shapes/Shape.js';
import { getCanvas } from './canvasContext.js';

export class CanvasViewModel {
	canvas = getCanvas();
	private selectedSvgElements: Map<Shape, SVGElement> = new Map();
	hoveredShape = $state<Shape | null>(null);

	addToSelection(shape: Shape, element: SVGGraphicsElement, clear: boolean = false) {
		if (clear) {
			this.clearSelection();
		}
		this.selectedSvgElements.set(shape, element);
		this.canvas.selected.add(shape);
	}

	hasSelection() {
		return this.canvas.selected.size !== 0;
	}

	removeFromSelection(shape: Shape) {
		this.canvas.selected.delete(shape);
		this.selectedSvgElements.delete(shape);
	}

	clearSelection() {
		this.canvas.selected.clear();
		this.selectedSvgElements.clear();
	}

	getSelectedSvgElement(shape: Shape) {
		return this.selectedSvgElements.get(shape);
	}

	deleteSelectedShapes() {
		for (let i = this.canvas.shapes.length - 1; i >= 0; i--) {
			const shape = this.canvas.shapes[i];
			if (this.canvas.selected.has(shape)) {
				this.canvas.shapes.splice(i, 1);
				if (shape === this.hoveredShape) {
					this.hoveredShape = null;
				}
			}
		}
		this.clearSelection();
	}
}
