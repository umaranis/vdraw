<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Page from '../routes/+page.svelte';
	import { expect, fireEvent, userEvent, within } from '@storybook/test';
	import { page } from '$app/state';

	const { Story } = defineMeta({
		title: 'Canvas',
		component: Page
	});
</script>

<Story
	name="Default"
	play={async ({ canvasElement }) => {
		//const canvas = within(canvasElement);
		const svg = document.querySelector('svg[tabindex="0"]');
		expect(svg).not.toBeNull();
		if (svg === null) {
			return;
		}
		expect(svg).toHaveAttribute('tabindex');
		// await userEvent.pointer({ target: svg, coords: { clientX: 100, clientY: 100 } });
		// await userEvent.click(svg);
		await fireEvent.mouseMove(svg, { clientX: 100, clientY: 150 });
		await fireEvent.mouseDown(svg, { clientX: 100, clientY: 150 });
		await fireEvent.mouseUp(svg, { clientX: 100, clientY: 150 });

		const rect = document.querySelector('rect.overlay');
		expect(rect).toBeInTheDocument();

		if (rect === null) {
			return;
		}

		await fireEvent.mouseMove(rect, { clientX: 101, clientY: 151 });
		await fireEvent.mouseOver(rect, { clientX: 101, clientY: 151 });
		await fireEvent.mouseEnter(rect, { clientX: 101, clientY: 151 });

		// await fireEvent.mouseMove(rect, { clientX: 101, clientY: 151 });
		// await fireEvent.mouseDown(rect, { clientX: 101, clientY: 151 });
		// await fireEvent.mouseUp(rect, { clientX: 101, clientY: 151 });
	}}
></Story>
