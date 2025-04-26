<script lang="ts">
	import RectangleToolView from './RectangleToolView.svelte';
	import CircleToolView from './CircleToolView.svelte';
</script>

<div class="tool-palette">
	<RectangleToolView />
	<CircleToolView />
</div>

<style>
	.tool-palette {
		display: flex;
		gap: 8px;
		padding: 8px;
		border-bottom: 1px solid #ccc;
	}
</style>
