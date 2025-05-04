<script lang="ts">
	import { createCanvas } from '$lib/model/Canvas.js';
	import CanvasView from '$lib/view/canvas/CanvasView.svelte';
	import ToolPaletteView from '$lib/view/tools/ToolPaletteView.svelte';

	const canvas = $state(createCanvas());
</script>

<h1>Welcome to vdraw</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>

<ToolPaletteView toolPalette={canvas.toolPalette} />
<CanvasView {canvas} />
