<script lang="ts">
	import type { RectangleType } from '../../model/shapes/Rectangle.js';
	import RectStrokeTrace from './RectStrokeTrace.svelte';
	import SelectionDecoratorRect from './SelectionDecoratorRect.svelte';

	let { shape: r }: { shape: RectangleType } = $props();
	let strokeWidth = $derived(r.strokeWidth ?? 0);
</script>

<RectStrokeTrace shape={r} />
<SelectionDecoratorRect {r} {strokeWidth} />
