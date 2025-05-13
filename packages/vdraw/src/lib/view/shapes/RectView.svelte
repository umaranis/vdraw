<script lang="ts">
	import type { Rectangle } from '../../model/shapes/Rectangle.js';

	let {
		shape: r,
		onmousedown,
		onmouseenter,
		onmouseleave
	}: {
		shape: Rectangle;
		onmousedown: (e: MouseEvent) => void;
		onmouseenter: () => void;
		onmouseleave: () => void;
	} = $props();
</script>

<rect
	x={r.x}
	y={r.y}
	width={r.width}
	height={r.height}
	fill={r.fill}
	stroke={r.stroke}
	stroke-width={r.strokeWidth}
/>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<rect
	x={r.x}
	y={r.y}
	width={r.width}
	height={r.height}
	class="overlay"
	fill={r.fill}
	{onmousedown}
	{onmouseenter}
	{onmouseleave}
/>

<style>
	.overlay {
		stroke-width: 20px;
		stroke: black;
		stroke-opacity: 0;
	}
</style>
