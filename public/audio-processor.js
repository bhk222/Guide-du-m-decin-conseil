/**
 * AudioWorklet processor for microphone capture — V3.3.414
 * Modern AudioWorkletNode — runs on audio thread, no main thread blocking
 * Features:
 * - High-pass filter (80Hz) to remove low-frequency rumble (A/C, desk vibration)
 * - Speech-band energy calculation (300-3000Hz proxy via zero-crossing rate)
 * - Adaptive noise floor estimation
 */
class AudioCaptureProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this._active = true;
        // High-pass filter state (1st order IIR, ~80Hz cutoff at 16kHz)
        this._prevInput = 0;
        this._prevOutput = 0;
        // Adaptive noise floor (starts conservative, adapts over time)
        this._noiseFloor = 0.01;
        this._frameCount = 0;
        
        this.port.onmessage = (e) => {
            if (e.data === 'stop') this._active = false;
        };
    }

    process(inputs) {
        if (!this._active) return false;
        const input = inputs[0];
        if (!input || !input[0]) return true;

        const data = input[0];
        const filtered = new Float32Array(data.length);
        
        // High-pass filter (1st order IIR) — removes rumble below ~80Hz
        // y[n] = 0.9875 * (y[n-1] + x[n] - x[n-1])
        const alpha = 0.9875;
        let prevIn = this._prevInput;
        let prevOut = this._prevOutput;
        for (let i = 0; i < data.length; i++) {
            prevOut = alpha * (prevOut + data[i] - prevIn);
            prevIn = data[i];
            filtered[i] = prevOut;
        }
        this._prevInput = prevIn;
        this._prevOutput = prevOut;
        
        // Compute RMS energy on filtered signal
        let sum = 0;
        let zeroCrossings = 0;
        for (let i = 0; i < filtered.length; i++) {
            sum += filtered[i] * filtered[i];
            // Zero-crossing rate — higher = more likely speech (300-3000Hz)
            if (i > 0 && ((filtered[i] >= 0) !== (filtered[i - 1] >= 0))) {
                zeroCrossings++;
            }
        }
        const rms = Math.sqrt(sum / filtered.length);
        
        // Zero-crossing rate normalized (0-1) — speech typically 0.1-0.4
        const zcr = zeroCrossings / filtered.length;
        
        // Adaptive noise floor — update during quiet periods
        this._frameCount++;
        if (rms < this._noiseFloor * 1.5 && this._frameCount > 10) {
            // Slowly adapt noise floor
            this._noiseFloor = 0.95 * this._noiseFloor + 0.05 * rms;
        }
        
        // Speech likelihood: high RMS above noise floor + speech-band ZCR
        const isSpeechLikely = rms > this._noiseFloor * 2.5 && zcr > 0.05 && zcr < 0.5;
        
        // Send filtered audio + RMS + speech detection to main thread
        this.port.postMessage({ 
            samples: filtered, 
            rms, 
            isSpeechLikely,
            noiseFloor: this._noiseFloor 
        }, [filtered.buffer]);
        return true;
    }
}

registerProcessor('audio-capture-processor', AudioCaptureProcessor);
