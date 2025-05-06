<script lang="ts">
	import SvgContainer from '$lib/view/canvas/SvgContainer.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<SvgContainer viewBox={{ x: 0, y: 0, zoom: 1 }} onkeydown={() => {}} onmousedown={() => {}}>
	{@render children()}
</SvgContainer>
