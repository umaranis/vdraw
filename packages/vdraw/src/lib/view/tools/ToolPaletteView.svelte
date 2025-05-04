<script lang="ts">
	import RectangleToolView from './RectangleToolView.svelte';
	import CircleToolView from './CircleToolView.svelte';
	import type { ToolPalette } from '$lib/model/tools/ToolPalette.js';

	let { toolPalette }: { toolPalette: ToolPalette } = $props();
</script>

<div class="tool-palette">
	<RectangleToolView {toolPalette} />
	<CircleToolView {toolPalette} />
</div>

<style>
	.tool-palette {
		display: flex;
		gap: 8px;
		padding: 8px;
		border-bottom: 1px solid #ccc;
	}
</style>
