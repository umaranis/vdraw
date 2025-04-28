<script lang="ts">
	import type { RectangleType } from '$lib/model/shapes/Rectangle.js';

	let { shape: r }: { shape: RectangleType } = $props();
	const strokeWidth = $derived(r.strokeWidth ?? 0);
</script>

<rect
	x={r.x - strokeWidth / 2 + 2}
	y={r.y - strokeWidth / 2 + 2}
	width={r.width + strokeWidth / 2}
	height={r.height + strokeWidth / 2}
	stroke="var(--selection-color)"
	stroke-width="2"
	fill="none"
/>
