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
		const destination = audioContext.destination;
		const currentTime = audioContext.currentTime;
		const decay = 0.05;
		const endTime = currentTime + decay;
		const volume = 0.5;

		const oscillator = audioContext.createOscillator();
		oscillator.type = 'sine';
		oscillator.frequency.value = 650;

		const gainNode = audioContext.createGain();
		// This acts as a fade out. Start at set volume and then ramp down to almost silent.
		gainNode.gain.setValueAtTime(volume, currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.001, endTime);

		oscillator.connect(gainNode);
		gainNode.connect(destination);

		oscillator.start();
		oscillator.stop(endTime);

		oscillator.onended = () => {
			oscillator.disconnect();
			gainNode.disconnect();
		};
	}
}

export default new Metronome();
