<script lang="ts">
	import RectangleToolView from './RectangleToolView.svelte';
	import CircleToolView from './CircleToolView.svelte';
	import type { CanvasViewModel } from '$lib/viewmodel/canvas/CanvasVM.svelte.js';
	import SelectionToolView from './SelectionToolView.svelte';
	import PathToolView from './PathToolView.svelte';

	let { canvasVM }: { canvasVM: CanvasViewModel } = $props();
</script>

<div class="tool-palette">
	<SelectionToolView {canvasVM} />
	<RectangleToolView {canvasVM} />
	<CircleToolView {canvasVM} />
	<PathToolView {canvasVM} />
</div>

<style>
	.tool-palette {
		display: flex;
		gap: 8px;
		padding: 8px;
		border-bottom: 1px solid #ccc;
	}
</style>
