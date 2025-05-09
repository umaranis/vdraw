<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ToolPaletteView from '../lib/view/tools/ToolPaletteView.svelte';
	import { createCanvas } from '$lib/model/Canvas.js';
	import { CanvasSelectionVM } from '$lib/viewmodel/canvas/CanvasSelectionVM.svelte.js';

	const { Story } = defineMeta({
		title: 'ToolPaletteView',
		component: ToolPaletteView
	});

	const canvas = $state(createCanvas());
	const canvasVM = new CanvasSelectionVM(canvas);
</script>

<Story name="Default" args={{ canvasVM }}></Story>
