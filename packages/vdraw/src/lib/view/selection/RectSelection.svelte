<script lang="ts">
	import type { RectangleType } from '../../model/shapes/Rectangle.js';

	let { shape: r }: { shape: RectangleType } = $props();
</script>

<rect
	x={r.x - 2}
	y={r.y - 2}
	width={r.width + 4}
	height={r.height + 4}
	stroke="lightblue"
	stroke-width="2"
	fill="none"
/>
<rect
	x={r.x - 4}
	y={r.y - 4}
	width={8}
	height={8}
	stroke="lightblue"
	stroke-width="2"
	fill="white"
/>
<rect
	x={r.x + r.width - 4}
	y={r.y - 4}
	width={8}
	height={8}
	stroke="lightblue"
	stroke-width="2"
	fill="white"
/>
<rect
	x={r.x - 4}
	y={r.y + r.height - 4}
	width={8}
	height={8}
	stroke="lightblue"
	stroke-width="2"
	fill="white"
/>
<rect
	x={r.x + r.width - 4}
	y={r.y + r.height - 4}
	width={8}
	height={8}
	stroke="lightblue"
	stroke-width="2"
	fill="white"
/>
