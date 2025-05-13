<script lang="ts">
	import type { Circle } from '../../model/shapes/Circle.js';
	import CircleStrokeTrace from '../selection/CircleStrokeTrace.svelte';

	let {
		shape: c,
		onmousedown,
		onmouseenter,
		onmouseleave
	}: {
		shape: Circle;
		onmousedown: () => void;
		onmouseenter: () => void;
		onmouseleave: () => void;
	} = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<circle
	cx={c.x}
	cy={c.y}
	r={c.radius}
	fill={c.fill}
	stroke={c.stroke}
	stroke-width={c.strokeWidth}
/>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<circle
	cx={c.x}
	cy={c.y}
	r={c.radius}
	class="overlay"
	fill={c.fill}
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
