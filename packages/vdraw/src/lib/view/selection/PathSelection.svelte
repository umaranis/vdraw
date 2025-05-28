<script lang="ts">
	import type { MSegment, Path } from '$lib/model/shapes/path/Path.js';
	import PathStrokeTrace from './PathStrokeTrace.svelte';
	import SelectionDecoratorRect from './SelectionDecoratorRect.svelte';

	let {
		shape: p,
		element,
		onmousedownOnShape
	}: {
		shape: Path;
		element: SVGGraphicsElement;
		onmousedownOnShape: (e: MouseEvent) => void;
	} = $props();
	let r = $derived.by(() => {
		// add dependency
		(p.segments[0] as MSegment).x;
		(p.segments[0] as MSegment).y;

		return element.getBBox();
	});
	let strokeWidth = $derived(p.strokeWidth ?? 0);
</script>

<PathStrokeTrace shape={p} onmousedown={onmousedownOnShape} />
<SelectionDecoratorRect {r} {strokeWidth} />
