import type { Canvas } from '$lib/model/Canvas.js';
import type { Shape } from '$lib/model/shapes/Shape.js';

export type CanvasViewModel = CanvasSelectionVM;

/**
 * Canvas Selection View Model
 */
export class CanvasSelectionVM {
	canvas;
	private selectedSvgElements: Map<Shape, SVGElement> = new Map();

	hoveredShape = $state<Shape | null>(null);
	hoverOnTrace = $state(false);
	draggedShape = $state<Shape | null>(null);

	svgContainerRef: SVGSVGElement | null = null;

	constructor(canvas: Canvas) {
		this.canvas = canvas;
	}
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

	isShapeSelected(shape: Shape) {
		return this.canvas.selected.has(shape);
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

	focus() {
		this.svgContainerRef?.focus();
	}
}
