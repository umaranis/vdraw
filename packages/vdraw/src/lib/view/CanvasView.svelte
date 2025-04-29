<script lang="ts">
	import type { Shape } from '$lib/model/shapes/Shape.js';
	import { createModelViewMap } from '$lib/view/modelViewMap.js';
	import { CanvasViewModel } from './CanvasViewModel.svelte.js';

	const mapModelView = createModelViewMap();

	const viewModel = new CanvasViewModel();
	const canvas = viewModel.canvas;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<svg
	xmlns="http://www.w3.org/2000/svg"
	width="100%"
	height="80vh"
	preserveAspectRatio="none"
	onmousedown={(event) => {
		if (viewModel.hasSelection()) {
			viewModel.clearSelection();
		} else {
			canvas.toolPalette.currentTool.onclick(event, canvas);
		}
	}}
	onkeydown={(event) => {
		switch (event.key) {
			case 'Escape':
				viewModel.clearSelection();
				break;
			case 'Delete':
			case 'Backspace':
				viewModel.deleteSelectedShapes();
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
				viewModel.addToSelection(shape, e.target as SVGGraphicsElement, !e.shiftKey);
				viewModel.draggedShape = shape;
			}}
			onmouseenter={() => {
				viewModel.hoveredShape = shape;
			}}
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
			onmousedown={(e: MouseEvent) => {
				e.stopPropagation();
				viewModel.addToSelection(
					viewModel.hoveredShape!,
					e.target as SVGGraphicsElement,
					!e.shiftKey
				);
				viewModel.draggedShape = viewModel.hoveredShape;
			}}
			onmouseenter={() => {
				viewModel.hoverOnTrace = true;
			}}
			onmouseleave={() => {
				viewModel.hoverOnTrace = false;
			}}
		/>
	{/if}

	{#each canvas.selected as shape (shape)}
		{@const SelectionComponent = mapModelView[shape.type].selection}
		<SelectionComponent {shape} element={viewModel.getSelectedSvgElement(shape)} />
	{/each}
</svg>

<svelte:window
	onmousemove={(event) => {
		if (viewModel.draggedShape) {
			canvas.selected.forEach((shape) => {
				shape.x += event.movementX;
				shape.y += event.movementY;
			});
		}
	}}
	onmouseup={() => (viewModel.draggedShape = null)}
/>

<style>
	svg {
		border: 1px solid black;
		--selection-color: #3182ed;
	}
</style>
