<script lang="ts">
	import { convertToPathData } from '$lib/model/shapes/path/convertToPathData.js';
	import type { Path } from '../../model/shapes/path/Path.js';

	let {
		shape: p,
		onmousedown,
		onmouseenter,
		onmouseleave
	}: {
		shape: Path;
		onmousedown: () => void;
		onmouseenter: () => void;
		onmouseleave: () => void;
	} = $props();

	const d = $derived(convertToPathData(p.segments));
</script>

<path {d} fill={p.fill} stroke={p.stroke} stroke-width={p.strokeWidth} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<path {d} class="overlay" fill={p.fill} {onmousedown} {onmouseenter} {onmouseleave} />

<style>
	.overlay {
		stroke-width: 20px;
		stroke: black;
		stroke-opacity: 0;
	}
</style>
