/**
 * AudioWorklet processor for microphone capture
 * Replaces deprecated ScriptProcessorNode with modern AudioWorkletNode
 * Runs on audio thread — no main thread blocking
 */
class AudioCaptureProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this._active = true;
        this.port.onmessage = (e) => {
            if (e.data === 'stop') this._active = false;
        };
    }

    process(inputs) {
        if (!this._active) return false;
        const input = inputs[0];
        if (!input || !input[0]) return true;

        const data = input[0];
        // Compute RMS energy
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
        const rms = Math.sqrt(sum / data.length);

        // Send audio data + RMS to main thread
        this.port.postMessage({ samples: data.slice(), rms }, []);
        return true;
    }
}

registerProcessor('audio-capture-processor', AudioCaptureProcessor);
