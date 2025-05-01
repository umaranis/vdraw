<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		...rest
	}: {
		children: Snippet;
		onmousedown: (e: MouseEvent) => void;
		onkeydown: (e: KeyboardEvent) => void;
	} = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<svg
	xmlns="http://www.w3.org/2000/svg"
	width="100%"
	height="80vh"
	preserveAspectRatio="none"
	tabindex="0"
	{...rest}
>
	{@render children()}
</svg>

<style>
	svg {
		border: 1px solid black;
		--selection-color: #3182ed;
	}
</style>
