<script lang="ts">
	import { createCanvas } from '$lib/model/Canvas.js';
	import CanvasView from '$lib/view/CanvasView.svelte';
	import ToolPaletteView from '$lib/view/tools/ToolPaletteView.svelte';
	import { setCanvas } from '$lib/view/canvasContext.js';

	const canvas = $state(createCanvas());
	setCanvas(canvas);
</script>

<h1>Welcome to vDraw</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>

<ToolPaletteView />
<CanvasView />
