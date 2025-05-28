<script lang="ts">
	import type { Circle } from '$lib/model/shapes/Circle.js';

	let {
		shape: c,
		onmousedown,
		onmouseenter,
		onmouseleave
	}: {
		shape: Circle;
		onmousedown: (e: MouseEvent) => void;
		onmouseenter?: () => void;
		onmouseleave?: () => void;
	} = $props();
</script>

<!-- svelte-ignore attribute_global_event_reference -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<circle
	cx={c.x}
	cy={c.y}
	r={c.radius + 2}
	class="trace"
	{onmousedown}
	{onmouseenter}
	{onmouseleave}
/>

<style>
	.trace {
		stroke: var(--selection-color);
		stroke-width: 2;
		fill: none;
	}
</style>
