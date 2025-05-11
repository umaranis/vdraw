<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		viewBox,
		children,
		svgContainerRef = $bindable<SVGSVGElement | null>(),
		...rest
	}: {
		viewBox: { x: number; y: number; zoom: number };
		children: Snippet;
		svgContainerRef: SVGSVGElement | null;
		onmousedown: (e: MouseEvent) => void;
		onkeydown: (e: KeyboardEvent) => void;
	} = $props();

	const DEFAULT_HEIGHT = 5000;
	const DEFAULT_WIDTH = 5000;
	const width = $derived(DEFAULT_WIDTH * viewBox.zoom);
	const height = $derived(DEFAULT_HEIGHT * viewBox.zoom);

	function onWheel(e: WheelEvent) {
		e.preventDefault();

		const isZoom = e.ctrlKey || e.metaKey;

		if (isZoom) {
			const zoomFactor = e.deltaY > 0 ? 1.06 : 0.94;

			viewBox.x += e.offsetX * viewBox.zoom * (1 - zoomFactor);
			viewBox.y += e.offsetY * viewBox.zoom * (1 - zoomFactor);

			viewBox.zoom = viewBox.zoom * zoomFactor;
		} else {
			// Interpret scroll as pan
			viewBox.x += e.deltaX;
			viewBox.y += e.deltaY;
		}
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<svg
	bind:this={svgContainerRef}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="{viewBox.x} {viewBox.y} {width} {height}"
	tabindex="0"
	onwheel={onWheel}
	{...rest}
>
	{@render children()}
</svg>

<style>
	svg {
		--selection-color: #3182ed;
		width: 5000px;
		height: 5000px;
	}
</style>
