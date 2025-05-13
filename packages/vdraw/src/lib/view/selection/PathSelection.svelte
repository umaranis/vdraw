<script lang="ts">
	import type { Path } from '$lib/model/shapes/path/Path.js';
	import PathStrokeTrace from './PathStrokeTrace.svelte';
	import SelectionDecoratorRect from './SelectionDecoratorRect.svelte';

	let { shape: p, element }: { shape: Path; element: SVGGraphicsElement } = $props();
	// getSvgElement doesn't return null because it is only called after the element is clicked and selected
	let r = $derived.by(() => {
		// add dependency
		p.segments;

		return element.getBBox();
	});
	let strokeWidth = $derived(p.strokeWidth ?? 0);
</script>

<PathStrokeTrace shape={p} />
<SelectionDecoratorRect {r} {strokeWidth} />
