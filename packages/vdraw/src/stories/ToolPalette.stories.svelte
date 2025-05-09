<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ToolPaletteView from '../lib/view/tools/ToolPaletteView.svelte';
	import { createCanvas } from '$lib/model/Canvas.js';
	import { CanvasViewModel } from '$lib/viewmodel/canvas/CanvasVM.svelte.js';

	const { Story } = defineMeta({
		title: 'ToolPaletteView',
		component: ToolPaletteView
	});

	const canvas = $state(createCanvas());
	const canvasVM = new CanvasViewModel(canvas);
</script>

<Story name="Default" args={{ canvasVM }}></Story>
