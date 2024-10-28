class Metronome {
	bpm = $state(120);
	isRunning = $state(false);
	intervalId: number | null = null;

	beatCount: number = $state(4);
	currentBeat: number = $state(1);

	setBpm(value: number) {
		this.bpm = value;

		if (this.isRunning) {
			this.reset();
		}
	}

	start() {
		if (this.isRunning) return;

		// The beat count should always reset when the metronome starts.
		this.currentBeat = 1;

		const beatsPerMS = 60_000 / this.bpm;
		const audioContext = new AudioContext();

		this.intervalId = setInterval(() => {
			this.currentBeat = this.currentBeat >= this.beatCount ? 1 : this.currentBeat + 1;
			this.playClick(audioContext);
		}, beatsPerMS);

		this.isRunning = true;
	}

	stop() {
		this.isRunning = false;

		if (!this.intervalId) return;

		clearInterval(this.intervalId);
	}

	reset() {
		this.stop();
		this.currentBeat = 1;
		this.start();
	}

	private playClick(audioContext: AudioContext) {
		const oscillator = audioContext.createOscillator();
		const destination = audioContext.destination;
		const currentTime = audioContext.currentTime;
		const gainNode = audioContext.createGain();
		const decay = 0.05;

		oscillator.type = 'sine';
		oscillator.frequency.value = 650;

		gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + decay);

		oscillator.connect(destination);
		oscillator.start();
		oscillator.stop(currentTime + decay);
	}
}

export default new Metronome();
