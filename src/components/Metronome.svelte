<script lang="ts">
	import metronome from '$lib/metronome.svelte';
	import BeatCounter from './MetronomeBeatCounter.svelte';
	import BpmForm from './MetronomeBpmForm.svelte';
	import OnOffSwitch from './MetronomeOnOffSwitch.svelte';

	function setBpm(value: number) {
		metronome.setBpm(value);
	}
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<section class="container mx-auto max-w-sm rounded-2xl border-2 border-neutral-400 bg-white">
		<BpmForm bpm={metronome.bpm} {setBpm} />
		<BeatCounter beatCount={metronome.beatCount} currentBeat={metronome.currentBeat} />

		<div class="flex items-center justify-center p-14">
			<OnOffSwitch
				isRunning={metronome.isRunning}
				start={() => metronome.start()}
				stop={() => metronome.stop()}
			/>
		</div>
	</section>
</div>
