<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RectView from '../lib/view/shapes/RectView.svelte';
	import { expect, within } from '@storybook/test';
	import SvgContainerDecorator from './decorators/SvgContainerDecorator.svelte';

	const { Story } = defineMeta({
		title: 'RectView',
		component: RectView,
		// @ts-ignore
		decorators: [() => SvgContainerDecorator]
	});
</script>

<Story
	name="Default"
	args={{
		shape: {
			type: 'rect',
			x: 100,
			y: 100,
			width: 100,
			height: 100,
			fill: 'red',
			stroke: 'black',
			strokeWidth: 8
		},
		onmousedown: () => {},
		onmouseenter: () => {},
		onmouseleave: () => {}
	}}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const svg = document.getElementsByTagName('svg')[0];
		expect(svg).toHaveAttribute('tabindex');
	}}
></Story>
