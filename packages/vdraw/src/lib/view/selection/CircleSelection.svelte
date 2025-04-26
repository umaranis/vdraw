<script lang="ts">
	import type { CircleType } from '../../model/shapes/Circle.js';

	let { shape: c }: { shape: CircleType } = $props();
</script>

<circle cx={c.x} cy={c.y} r={c.radius + 2} stroke="lightblue" stroke-width="2" fill="none" />
<rect
	x={c.x - 4}
	y={c.y - c.radius - 4}
	width={8}
	height={8}
	stroke="lightblue"
	stroke-width="2"
	fill="white"
/>
<rect
	x={c.x + c.radius - 4}
	y={c.y - 4}
	width={8}
	height={8}
	stroke="lightblue"
	stroke-width="2"
	fill="white"
/>
<rect
	x={c.x - 4}
	y={c.y + c.radius - 4}
	width={8}
	height={8}
	stroke="lightblue"
	stroke-width="2"
	fill="white"
/>
<rect
	x={c.x - c.radius - 4}
	y={c.y - 4}
	width={8}
	height={8}
	stroke="lightblue"
	stroke-width="2"
	fill="white"
/>
