<script lang="ts">
	import type { Circle } from '../../model/shapes/Circle.js';
	import CircleStrokeTrace from './CircleStrokeTrace.svelte';
	import SelectionDecoratorRect from './SelectionDecoratorRect.svelte';

	let {
		shape: c,
		element,
		onmousedownOnShape
	}: {
		shape: Circle;
		element: SVGGraphicsElement;
		onmousedownOnShape: (e: MouseEvent) => void;
	} = $props();
	let r = $derived.by(() => {
		// add dependency
		c.x;
		c.y;
		c.radius;

		return element.getBBox();
	});
	let strokeWidth = $derived(c.strokeWidth ?? 0);
</script>

<CircleStrokeTrace shape={c} onmousedown={onmousedownOnShape} />
<SelectionDecoratorRect {r} {strokeWidth} />
