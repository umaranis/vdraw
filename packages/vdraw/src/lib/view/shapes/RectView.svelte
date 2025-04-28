<script lang="ts">
	import type { RectangleType } from '../../model/shapes/Rectangle.js';
	import RectStrokeTrace from '../selection/RectStrokeTrace.svelte';

	let {
		shape: r,
		onmousedown,
		onmouseenter,
		onmouseleave
	}: {
		shape: RectangleType;
		onmousedown: (e: MouseEvent) => void;
		onmouseenter: () => void;
		onmouseleave: () => void;
	} = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
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
	stroke-width="20"
	stroke-opacity="0"
	stroke="black"
	fill={r.fill}
	{onmousedown}
	{onmouseenter}
	{onmouseleave}
/>
