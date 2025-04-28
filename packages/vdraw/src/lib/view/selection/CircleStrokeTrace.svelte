<script lang="ts">
	import type { CircleType } from '$lib/model/shapes/Circle.js';

	let { shape: c }: { shape: CircleType } = $props();
</script>

<circle
	cx={c.x}
	cy={c.y}
	r={c.radius + 2}
	stroke="var(--selection-color)"
	stroke-width="2"
	fill="none"
/>
