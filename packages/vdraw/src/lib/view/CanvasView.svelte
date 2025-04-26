<script lang="ts">
	import { createCanvas } from '../model/Canvas.js';
	import { createModelViewMap } from '$lib/view/modelViewMap.js';
	import Selection from '$lib/view/selection/Selection.svelte';

	const mapModelView = createModelViewMap();

	const canvas = $state(createCanvas());
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<svg
	xmlns="http://www.w3.org/2000/svg"
	width="100%"
	height="80vh"
	preserveAspectRatio="none"
	onclick={(event) => {
		if (canvas.selected.size !== 0) {
			canvas.selected.clear();
		} else {
			canvas.toolPalette.currentTool.onclick(event, canvas);
		}
	}}
	onkeydown={(event) => {
		switch (event.key) {
			case 'Escape':
				canvas.selected.clear();
				break;
			case 'Delete':
			case 'Backspace':
				// Remove selected shapes in place
				for (let i = canvas.shapes.length - 1; i >= 0; i--) {
					if (canvas.selected.has(canvas.shapes[i])) {
						canvas.shapes.splice(i, 1);
					}
				}
				canvas.selected.clear();
				break;
		}
	}}
	tabindex="0"
>
	{#each canvas.shapes as shape (shape)}
		{@const ShapeComponent = mapModelView[shape.type]}
		<ShapeComponent
			{shape}
			onclick={(e: MouseEvent) => {
				e.stopPropagation();
				canvas.selected.add(shape);
			}}
		/>
	{/each}

	{#each canvas.selected as shape (shape)}
		<Selection {shape} />
	{/each}
</svg>

<style>
	svg {
		border: 1px solid black;
	}
</style>
