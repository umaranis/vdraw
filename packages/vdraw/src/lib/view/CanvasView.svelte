<script lang="ts">
	import { createCanvas } from '../model/Canvas.js';
	import { createModelViewMap } from '$lib/view/modelViewMap.js';
	import Selection from '$lib/view/selection/Selection.svelte';

	const mapModelView = createModelViewMap();

	const canvas = $state(createCanvas());
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<svg
	xmlns="http://www.w3.org/2000/svg"
	width="100%"
	height="80vh"
	preserveAspectRatio="none"
	onclick={(event) => {
		if (canvas.selected.size !== 0) {
			canvas.selected.forEach((s) => (s.selected = false));
			canvas.selected.clear();
		} else {
			canvas.toolPalette.currentTool.onclick(event, canvas);
		}
	}}
>
	{#each canvas.shapes as shape (shape)}
		{@const ShapeComponent = mapModelView[shape.type]}
		<ShapeComponent {shape} onSelection={() => canvas.selected.add(shape)} />
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
