<script lang="ts">
	import type { RectangleType } from '../../model/shapes/Rectangle.js';

	let { shape: r, onclick }: { shape: RectangleType; onclick: () => void } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<rect
	x={r.x}
	y={r.y}
	width={r.width}
	height={r.height}
	fill={r.fill}
	stroke={r.stroke}
	stroke-width={r.strokeWidth}
	{onclick}
/>
