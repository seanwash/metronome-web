<script lang="ts">
	let {
		isRunning,
		start,
		stop
	}: {
		isRunning: boolean;
		start: () => void;
		stop: () => void;
	} = $props();
</script>

{#if isRunning}
	<button class="h-12 w-12 rounded-full bg-red-500" type="button" onclick={() => stop()}>
		<span class="sr-only">Stop</span>
	</button>
{:else}
	<button class="h-12 w-12 rounded-full bg-green-500" type="button" onclick={() => start()}>
		<span class="sr-only">Start</span>
	</button>
{/if}
