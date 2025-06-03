<script lang="ts">
	import type { CanvasViewModel } from '$lib/viewmodel/canvas/CanvasVM.svelte.js';

	let { canvasVM }: { canvasVM: CanvasViewModel } = $props();
	const toolPalette = canvasVM.toolPalette;
</script>

<button
	class="tool-button {toolPalette.currentTool === toolPalette.tools.circleTool ? 'active' : ''}"
	onclick={() => {
		canvasVM.selectTool(toolPalette.tools.circleTool);
		canvasVM.focus();
	}}
	aria-label="Circle Tool"
>
	<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2" />
	</svg>
</button>

<style>
	.tool-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border: 1px solid #ccc;
		background: white;
		border-radius: 4px;
		cursor: pointer;
		padding: 8px;
	}

	.tool-button:hover {
		background: #f0f0f0;
	}

	.tool-button.active {
		background: #e0e0ff;
		border-color: #8080ff;
	}

	svg {
		width: 100%;
		height: 100%;
	}
</style>
