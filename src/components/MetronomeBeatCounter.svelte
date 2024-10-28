<script lang="ts">
	let {
		beatCount,
		currentBeat
	}: {
		beatCount: number;
		currentBeat: number;
	} = $props();
</script>

<div class="mt-8 flex items-center justify-center space-x-4">
	{#each Array.from({ length: beatCount }, (v, i) => i) as beatIndex}
		<span
			class="h-8 w-8 rounded-full bg-neutral-200 transition-colors"
			class:bg-neutral-700={beatIndex + 1 === currentBeat}
		></span>
	{/each}
</div>
