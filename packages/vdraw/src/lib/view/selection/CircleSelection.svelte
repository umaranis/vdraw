<script lang="ts">
	import type { CircleType } from '../../model/shapes/Circle.js';
	import CircleStrokeTrace from './CircleStrokeTrace.svelte';
	import SelectionDecoratorRect from './SelectionDecoratorRect.svelte';

	let { shape: c, element }: { shape: CircleType; element: SVGGraphicsElement } = $props();
	// getSvgElement doesn't return null because it is only called after the element is clicked and selected
	let r = $derived.by(() => {
		// add dependency
		c.x;
		c.y;
		c.radius;

		return element.getBBox();
	});
	let strokeWidth = $derived(c.strokeWidth ?? 0);
</script>

<CircleStrokeTrace shape={c} />
<SelectionDecoratorRect {r} {strokeWidth} />
