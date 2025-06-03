<script lang="ts">
	let {
		r,
		strokeWidth
	}: { r: { x: number; y: number; width: number; height: number }; strokeWidth: number } = $props();
</script>

<!-- selection box -->
<rect
	x={r.x - strokeWidth / 2 + 2}
	y={r.y - strokeWidth / 2 + 2}
	width={r.width + strokeWidth / 2}
	height={r.height + strokeWidth / 2}
	class="selection-rect"
/>

<!-- top left -->
<rect x={r.x - 6} y={r.y - 6} width={8} height={8} class="selection-corner" />
<rect
	x={r.x - 10}
	y={r.y - 10}
	width={16}
	height={16}
	class="selection-corner-overlay"
	style="cursor: nwse-resize;"
/>

<!-- top right -->
<rect x={r.x + r.width - 2} y={r.y - 6} width={8} height={8} class="selection-corner" />
<rect
	x={r.x + r.width - 6}
	y={r.y - 10}
	width={16}
	height={16}
	class="selection-corner-overlay"
	style="cursor: nesw-resize;"
/>

<!-- bottom left -->
<rect x={r.x - 6} y={r.y + r.height - 2} width={8} height={8} class="selection-corner" />
<rect
	x={r.x - 10}
	y={r.y + r.height - 6}
	width={16}
	height={16}
	class="selection-corner-overlay"
	style="cursor: nesw-resize;"
/>

<!-- bottom right -->
<rect x={r.x + r.width - 2} y={r.y + r.height - 2} width={8} height={8} class="selection-corner" />
<rect
	x={r.x + r.width - 6}
	y={r.y + r.height - 6}
	width={16}
	height={16}
	class="selection-corner-overlay"
	style="cursor: nwse-resize;"
/>

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

	.selection-corner-overlay {
		stroke: #3182ed;
		stroke-width: 1px;
		fill: black;
		opacity: 0;
	}
</style>
