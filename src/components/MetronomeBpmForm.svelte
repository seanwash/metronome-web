<script lang="ts">
	let { bpm, setBpm }: { bpm: number; setBpm: (value: number) => void } = $props();

	function handleChange(event: Event & { currentTarget: HTMLInputElement }) {
		const value = parseInt(event.currentTarget.value, 10);
		setBpm(value);
	}
</script>

<form class="flex items-center justify-center text-center">
	<input
		class="
				  focus inset-2 w-full rounded-t-2xl bg-neutral-100 py-10 text-center text-6xl outline-offset-2
					[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
				"
		min="1"
		onchange={handleChange}
		value={bpm}
	/>
</form>
