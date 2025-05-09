<script lang="ts">
	import { createCanvas } from '$lib/model/Canvas.js';
	import CanvasView from '$lib/view/canvas/CanvasView.svelte';
	import ToolPaletteView from '$lib/view/tools/ToolPaletteView.svelte';
	import { CanvasSelectionVM } from '$lib/viewmodel/canvas/CanvasSelectionVM.svelte.js';

	const canvas = $state(createCanvas());
	const canvasVM = new CanvasSelectionVM(canvas);
</script>

<h1>Welcome to vdraw</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>

<ToolPaletteView {canvasVM} />
<div class="canvas-container-parent">
	<div class="canvas-container">
		<CanvasView {canvasVM} />
	</div>
</div>

<style>
	.canvas-container-parent {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 80vh;
	}
	.canvas-container {
		border: 1px solid black;
		width: 80%;
		height: 100%;
		overflow: hidden;
	}
</style>
