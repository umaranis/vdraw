<script lang="ts">
	import type { CircleType } from '../../model/shapes/Circle.js';
	import CircleStrokeTrace from '../selection/CircleStrokeTrace.svelte';

	let {
		shape: c,
		onmousedown,
		onmouseenter,
		onmouseleave
	}: {
		shape: CircleType;
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
	stroke-width="20"
	stroke-opacity="0"
	stroke="black"
	fill={c.fill}
	{onmousedown}
	{onmouseenter}
	{onmouseleave}
/>
