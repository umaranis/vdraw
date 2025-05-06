<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ToolPaletteView from '../lib/view/tools/ToolPaletteView.svelte';
	import { createCanvas } from '$lib/model/Canvas.js';

	const { Story } = defineMeta({
		title: 'ToolPaletteView',
		component: ToolPaletteView
	});

	const canvas = $state(createCanvas());
</script>

<Story name="Default" args={{ toolPalette: canvas.toolPalette }}></Story>
