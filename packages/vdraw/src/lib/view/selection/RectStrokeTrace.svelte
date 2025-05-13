<script lang="ts">
	import type { Rectangle } from '$lib/model/shapes/Rectangle.js';

	let { shape: r, ...rest }: { shape: Rectangle } = $props();
	const strokeWidth = $derived(r.strokeWidth ?? 0);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<rect
	x={r.x - strokeWidth / 2 + 2}
	y={r.y - strokeWidth / 2 + 2}
	width={r.width + strokeWidth / 2}
	height={r.height + strokeWidth / 2}
	class="trace"
	{...rest}
/>

<style>
	.trace {
		stroke: var(--selection-color);
		stroke-width: 2;
		fill: none;
	}
</style>
