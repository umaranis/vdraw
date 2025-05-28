<script lang="ts">
	import type { Path } from '$lib/model/shapes/path/Path.js';
	import { convertToPathData } from '$lib/model/shapes/path/convertToPathData.js';

	let {
		shape: p,
		onmousedown,
		onmouseenter,
		onmouseleave
	}: {
		shape: Path;
		onmousedown: (e: MouseEvent) => void;
		onmouseenter?: () => void;
		onmouseleave?: () => void;
	} = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<path d={convertToPathData(p.segments)} class="trace" {onmousedown} {onmouseenter} {onmouseleave} />

<style>
	.trace {
		stroke: var(--selection-color);
		stroke-width: 2;
		fill: none;
	}
</style>
