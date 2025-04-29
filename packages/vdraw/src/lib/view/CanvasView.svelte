<script lang="ts">
	import type { Shape } from '$lib/model/shapes/Shape.js';
	import { createModelViewMap } from '$lib/view/modelViewMap.js';
	import { getCanvas } from './canvasContext.js';

	const mapModelView = createModelViewMap();

	const canvas = getCanvas();
	const selectedSvgElements: Map<Shape, SVGElement> = new Map();

	function addToSelection(shape: Shape, element: SVGGraphicsElement, clear: boolean = false) {
		if (clear) {
			clearSelection();
		}
		selectedSvgElements.set(shape, element);
		canvas.selected.add(shape);
	}
	function removeFromSelection(shape: Shape) {
		canvas.selected.delete(shape);
		selectedSvgElements.delete(shape);
	}
	function clearSelection() {
		canvas.selected.clear();
		selectedSvgElements.clear();
	}
	function getSelectedSvgElement(shape: Shape) {
		return selectedSvgElements.get(shape);
	}

	let draggedShape = $state<Shape | null>(null);
	let hoveredShape = $state<Shape | null>(null);
	let onTrace = $state(false);
	$inspect(hoveredShape);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<svg
	xmlns="http://www.w3.org/2000/svg"
	width="100%"
	height="80vh"
	preserveAspectRatio="none"
	onmousedown={(event) => {
		if (canvas.selected.size !== 0) {
			clearSelection();
		} else {
			canvas.toolPalette.currentTool.onclick(event, canvas);
		}
	}}
	onkeydown={(event) => {
		switch (event.key) {
			case 'Escape':
				clearSelection();
				break;
			case 'Delete':
			case 'Backspace':
				// Remove selected shapes in place
				for (let i = canvas.shapes.length - 1; i >= 0; i--) {
					const shape = canvas.shapes[i];
					if (canvas.selected.has(shape)) {
						canvas.shapes.splice(i, 1);
						if (shape === hoveredShape) {
							hoveredShape = null;
						}
					}
				}
				clearSelection();

				break;
		}
	}}
	tabindex="0"
>
	{#each canvas.shapes as shape (shape)}
		{@const ShapeComponent = mapModelView[shape.type].component}
		<ShapeComponent
			{shape}
			onmousedown={(e: MouseEvent) => {
				e.stopPropagation();
				addToSelection(shape, e.target as SVGGraphicsElement, !e.shiftKey);
				draggedShape = shape;
			}}
			onmouseenter={() => {
				hoveredShape = shape;
				console.log('onmouseenter for shape');
			}}
			onmouseleave={() => {
				console.log('onmouseleave for shape');
				setTimeout(() => {
					if (!onTrace && hoveredShape === shape) {
						hoveredShape = null;
					}
					//TODO: remove all logging
					console.log('timeout from onmouseleave for shape');
				});
			}}
		/>
	{/each}

	{#if hoveredShape}
		{@const StrokeTraceComponent = mapModelView[hoveredShape.type].strokeTrace}
		<StrokeTraceComponent
			shape={hoveredShape}
			onmousedown={(e: MouseEvent) => {
				e.stopPropagation();
				addToSelection(hoveredShape!, e.target as SVGGraphicsElement, !e.shiftKey);
				draggedShape = hoveredShape;
			}}
			onmouseenter={() => {
				onTrace = true;
				console.log('onmouseenter on trace');
			}}
			onmouseleave={() => {
				onTrace = false;
				console.log('onmouseleave on trace');
			}}
		/>
	{/if}

	{#each canvas.selected as shape (shape)}
		{@const SelectionComponent = mapModelView[shape.type].selection}
		<SelectionComponent {shape} element={getSelectedSvgElement(shape)} />
	{/each}
</svg>

<svelte:window
	onmousemove={(event) => {
		if (draggedShape) {
			canvas.selected.forEach((shape) => {
				shape.x += event.movementX;
				shape.y += event.movementY;
			});
		}
	}}
	onmouseup={() => (draggedShape = null)}
/>

<style>
	svg {
		border: 1px solid black;
		--selection-color: #3182ed;
	}
</style>
