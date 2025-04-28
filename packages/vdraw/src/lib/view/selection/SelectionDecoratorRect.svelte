<script lang="ts">
	let {
		r,
		strokeWidth
	}: { r: { x: number; y: number; width: number; height: number }; strokeWidth: number } = $props();
</script>

<rect
	x={r.x - strokeWidth / 2 + 2}
	y={r.y - strokeWidth / 2 + 2}
	width={r.width + strokeWidth / 2}
	height={r.height + strokeWidth / 2}
	class="selection-rect"
/>
<rect x={r.x - 6} y={r.y - 6} width={8} height={8} class="selection-corner" />
<rect x={r.x + r.width - 2} y={r.y - 6} width={8} height={8} class="selection-corner" />
<rect x={r.x - 6} y={r.y + r.height - 2} width={8} height={8} class="selection-corner" />
<rect x={r.x + r.width - 2} y={r.y + r.height - 2} width={8} height={8} class="selection-corner" />

<style>
	.selection-rect {
		stroke: #3182ed;
		stroke-width: 1px;
		fill: none;
	}
	.selection-corner {
		stroke: #3182ed;
		stroke-width: 1px;
		fill: white;
	}
</style>
