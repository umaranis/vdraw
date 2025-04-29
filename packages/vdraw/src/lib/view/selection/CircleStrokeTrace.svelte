<script lang="ts">
	import type { CircleType } from '$lib/model/shapes/Circle.js';

	let { shape: c, ...rest }: { shape: CircleType } = $props();
</script>

<!-- svelte-ignore attribute_global_event_reference -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<circle cx={c.x} cy={c.y} r={c.radius + 2} class="trace" {...rest} />

<style>
	.trace {
		stroke: var(--selection-color);
		stroke-width: 2;
		fill: none;
	}
</style>
