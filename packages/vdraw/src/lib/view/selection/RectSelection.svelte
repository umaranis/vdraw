<script lang="ts">
	import type { Rectangle } from '../../model/shapes/Rectangle.js';
	import RectStrokeTrace from './RectStrokeTrace.svelte';
	import SelectionDecoratorRect from './SelectionDecoratorRect.svelte';

	let {
		shape: r,
		onmousedownOnShape
	}: { shape: Rectangle; onmousedownOnShape: (e: MouseEvent) => void } = $props();
	let strokeWidth = $derived(r.strokeWidth ?? 0);
</script>

<RectStrokeTrace shape={r} onmousedown={onmousedownOnShape} />
<SelectionDecoratorRect {r} {strokeWidth} />
