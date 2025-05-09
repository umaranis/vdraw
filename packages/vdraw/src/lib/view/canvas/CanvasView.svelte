<script lang="ts">
	import type { Shape } from '$lib/model/shapes/Shape.js';
	import { createModelViewMap } from '../modelViewMap.js';
	import type { CanvasViewModel } from '$lib/viewmodel/canvas/CanvasSelectionVM.svelte.js';
	import SvgContainer from './SvgContainer.svelte';

	const mapModelView = createModelViewMap();

	let { canvasVM }: { canvasVM: CanvasViewModel } = $props();
	const canvas = canvasVM.canvas;

	/**
	 * `onmousemove` is at times called without any real change in the mouse position.
	 * This is a workaround to avoid going into dragging mode.
	 */
	let dragStartCoords = $state<{ x: number; y: number } | null>(null);
	let hasDragged = $state(false);
	let grabbedSelectedShape = $state<Shape | null>(null);

	function mouseDownOnShape(e: MouseEvent, shape: Shape) {
		e.stopPropagation();
		if (canvasVM.isShapeSelected(shape)) {
			grabbedSelectedShape = shape;
		} else {
			canvasVM.addToSelection(shape, e.target as SVGGraphicsElement, !e.shiftKey);
		}
		canvasVM.draggedShape = shape;
		dragStartCoords = { x: e.clientX, y: e.clientY };
	}
</script>

<SvgContainer
	viewBox={canvas.viewBox}
	bind:svgContainerRef={canvasVM.svgContainerRef}
	onmousedown={(e: MouseEvent) => {
		canvasVM.toolPalette.currentTool.onmousedown(e, canvasVM);
	}}
	onkeydown={(e: KeyboardEvent) => {
		switch (e.key) {
			case 'Escape':
				canvasVM.toolPalette.switchToDefault();
				canvasVM.clearSelection();
				break;
			case 'Delete':
			case 'Backspace':
				canvasVM.deleteSelectedShapes();
				break;
		}
	}}
>
	{#each canvas.shapes as shape (shape)}
		{@const ShapeComponent = mapModelView[shape.type].component}
		<ShapeComponent
			{shape}
			onmousedown={(e: MouseEvent) => mouseDownOnShape(e, shape)}
			onmouseenter={() => (canvasVM.hoveredShape = shape)}
			onmouseleave={() => {
				// force the code to run after mouse enter on the trace
				setTimeout(() => {
					if (!canvasVM.hoverOnTrace && canvasVM.hoveredShape === shape) {
						canvasVM.hoveredShape = null;
					}
				});
			}}
		/>
	{/each}

	{#if canvasVM.hoveredShape}
		{@const StrokeTraceComponent = mapModelView[canvasVM.hoveredShape.type].strokeTrace}
		<StrokeTraceComponent
			shape={canvasVM.hoveredShape}
			onmousedown={(e: MouseEvent) => mouseDownOnShape(e, canvasVM.hoveredShape!)}
			onmouseenter={() => (canvasVM.hoverOnTrace = true)}
			onmouseleave={() => (canvasVM.hoverOnTrace = false)}
		/>
	{/if}

	{#each canvas.selected as shape (shape)}
		{@const SelectionComponent = mapModelView[shape.type].selection}
		<SelectionComponent {shape} element={canvasVM.getSelectedSvgElement(shape)} />
	{/each}
</SvgContainer>

<svelte:window
	onmousemove={(event) => {
		if (canvasVM.draggedShape) {
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
				canvasVM.removeFromSelection(grabbedSelectedShape);
			} else {
				canvasVM.addToSelection(grabbedSelectedShape, e.target as SVGGraphicsElement, true);
			}
		}
		canvasVM.draggedShape = null;
		hasDragged = false;
		grabbedSelectedShape = null;
		dragStartCoords = null;
	}}
/>
