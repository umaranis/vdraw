<script lang="ts">
    import type { CircleType } from '../../model/shapes/Circle.js';

    let { shape: c, onclick }: { shape: CircleType; onclick: () => void } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<circle
    cx={c.x}
    cy={c.y}
    r={c.radius}
    fill={c.fill}
    stroke={c.stroke}
    stroke-width={c.strokeWidth}
    {onclick}
/>