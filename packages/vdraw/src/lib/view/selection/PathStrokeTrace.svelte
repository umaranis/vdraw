<script lang="ts">
	import type { Path } from '$lib/model/shapes/path/Path.js';
	import { convertToPathData } from '$lib/model/shapes/path/convertToPathData.js';

	let { shape: p, ...rest }: { shape: Path } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<path d={convertToPathData(p.segments)} class="trace" {...rest} />

<style>
	.trace {
		stroke: var(--selection-color);
		stroke-width: 2;
		fill: none;
	}
</style>
