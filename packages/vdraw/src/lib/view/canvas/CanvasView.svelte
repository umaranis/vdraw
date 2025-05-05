<script lang="ts">
	import type { Canvas } from '$lib/model/Canvas.js';
	import type { Shape } from '$lib/model/shapes/Shape.js';
	import { createModelViewMap } from '../modelViewMap.js';
	import { CanvasSelectionVM } from './CanvasSelectionVM.svelte.js';
	import SvgContainer from './SvgContainer.svelte';

	const mapModelView = createModelViewMap();

	let { canvas }: { canvas: Canvas } = $props();
	const viewModel = new CanvasSelectionVM(canvas);

	/**
	 * `onmousemove` is at times called wwithout any real change in the mouse position.
	 * This is a workaround to avoid going into dragging mode.
	 */
	let dragStartCoords = $state<{ x: number; y: number } | null>(null);
	let hasDragged = $state(false);
	let grabbedSelectedShape = $state<Shape | null>(null);

	function mouseDownOnShape(e: MouseEvent, shape: Shape) {
		e.stopPropagation();
		if (viewModel.isShapeSelected(shape)) {
			grabbedSelectedShape = shape;
		} else {
			viewModel.addToSelection(shape, e.target as SVGGraphicsElement, !e.shiftKey);
		}
		viewModel.draggedShape = shape;
		dragStartCoords = { x: e.clientX, y: e.clientY };
	}
</script>

<SvgContainer
	viewBox={canvas.viewBox}
	onmousedown={(e: MouseEvent) => {
		if (viewModel.hasSelection()) {
			viewModel.clearSelection();
		} else {
			canvas.toolPalette.currentTool.onclick(e, canvas);
		}
	}}
	onkeydown={(e: KeyboardEvent) => {
		switch (e.key) {
			case 'Escape':
				viewModel.clearSelection();
				break;
			case 'Delete':
			case 'Backspace':
				viewModel.deleteSelectedShapes();
				break;
		}
	}}
>
	{#each canvas.shapes as shape (shape)}
		{@const ShapeComponent = mapModelView[shape.type].component}
		<ShapeComponent
			{shape}
			onmousedown={(e: MouseEvent) => mouseDownOnShape(e, shape)}
			onmouseenter={() => (viewModel.hoveredShape = shape)}
			onmouseleave={() => {
				// force the code to run after mouse enter on the trace
				setTimeout(() => {
					if (!viewModel.hoverOnTrace && viewModel.hoveredShape === shape) {
						viewModel.hoveredShape = null;
					}
				});
			}}
		/>
	{/each}

	{#if viewModel.hoveredShape}
		{@const StrokeTraceComponent = mapModelView[viewModel.hoveredShape.type].strokeTrace}
		<StrokeTraceComponent
			shape={viewModel.hoveredShape}
			onmousedown={(e: MouseEvent) => mouseDownOnShape(e, viewModel.hoveredShape!)}
			onmouseenter={() => (viewModel.hoverOnTrace = true)}
			onmouseleave={() => (viewModel.hoverOnTrace = false)}
		/>
	{/if}

	{#each canvas.selected as shape (shape)}
		{@const SelectionComponent = mapModelView[shape.type].selection}
		<SelectionComponent {shape} element={viewModel.getSelectedSvgElement(shape)} />
	{/each}
</SvgContainer>

<svelte:window
	onmousemove={(event) => {
		if (viewModel.draggedShape) {
			if (
				hasDragged ||
				(dragStartCoords &&
					(Math.abs(dragStartCoords.x - event.clientX) > 1 ||
						Math.abs(dragStartCoords.y - event.clientY) > 1))
			) {
				canvas.selected.forEach((shape) => {
					shape.x += event.movementX;
					shape.y += event.movementY;
				});
				hasDragged = true;
			}
		}
	}}
	onmouseup={(e: MouseEvent) => {
		if (grabbedSelectedShape && !hasDragged) {
			if (e.shiftKey) {
				viewModel.removeFromSelection(grabbedSelectedShape);
			} else {
				viewModel.addToSelection(grabbedSelectedShape, e.target as SVGGraphicsElement, true);
			}
		}
		viewModel.draggedShape = null;
		hasDragged = false;
		grabbedSelectedShape = null;
		dragStartCoords = null;
	}}
/>
