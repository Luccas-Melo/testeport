/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private masterVolume: GainNode | null = null;
  private droneOscillators: { osc1: OscillatorNode; osc2: OscillatorNode; filter: BiquadFilterNode; gain: GainNode } | null = null;
  public isEnabled = false;

  private initCtx() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      // Master volume node
      this.masterVolume = this.ctx.createGain();
      this.masterVolume.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterVolume.connect(this.ctx.destination);
    } catch (e) {
      console.warn('Failed to initialize Web Audio Context', e);
    }
  }

  public toggleAudio(state: boolean): boolean {
    this.isEnabled = state;
    if (this.isEnabled) {
      this.initCtx();
      this.resume();
      this.startDrone();
    } else {
      this.stopDrone();
      this.suspend();
    }
    return this.isEnabled;
  }

  private resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private suspend() {
    if (this.ctx && this.ctx.state === 'running') {
      // Don't suspend permanently, just silence the master node safely
      if (this.masterVolume) {
        this.masterVolume.gain.setValueAtTime(0, this.ctx.currentTime);
      }
    }
  }

  // Atmospheric Space Drone Reactor
  private startDrone() {
    if (!this.ctx || !this.masterVolume || !this.isEnabled) return;
    if (this.droneOscillators) return; // Already running

    this.resume();

    try {
      // 55Hz (A1) detuned oscillators to create a organic phasing beating effect
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // Deep A1 note

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(55.3, this.ctx.currentTime); // Detuned fractionally

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime); // Low cut for ambient hum
      filter.Q.setValueAtTime(3, this.ctx.currentTime);

      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      // Gentle fade-in over 2.5 seconds to avoid sudden loud clicks
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2.5);

      // Connect graph
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterVolume);

      osc1.start();
      osc2.start();

      this.droneOscillators = { osc1, osc2, filter, gain };
    } catch (e) {
      console.error('Failed to boot background space hum drone', e);
    }
  }

  private stopDrone() {
    if (!this.droneOscillators) return;
    try {
      const { osc1, osc2, gain } = this.droneOscillators;
      if (this.ctx) {
        // Safe fast ramp-out before termination
        gain.gain.setValueAtTime(gain.gain.value, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
          } catch (e) {}
        }, 500);
      } else {
        osc1.stop();
        osc2.stop();
      }
    } catch (error) {}
    this.droneOscillators = null;
  }

  // Micro UI Shutter click (Camera mechanical style)
  public playClick() {
    if (!this.ctx || !this.masterVolume || !this.isEnabled) return;
    this.resume();

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, this.ctx.currentTime);
      // Fast exponential slide downward to mimic a dynamic click
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.015);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
      filter.Q.setValueAtTime(1, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.018);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterVolume);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.02);
    } catch (error) {}
  }

  // Acoustic ascending chime on hover triggers
  public playHoverChime() {
    if (!this.ctx || !this.masterVolume || !this.isEnabled) return;
    this.resume();

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Harmonic crystalline frequency
      osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5 note
      osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.08); // E6 perfect fifth

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.masterVolume);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (error) {}
  }

  // Fluid frequency ripple chime on project selections
  public playImpactRipple() {
    if (!this.ctx || !this.masterVolume || !this.isEnabled) return;
    this.resume();

    try {
      // Trigger a stacked harmonic chord
      const frequencies = [220, 277.18, 329.63, 440]; // A major cinematic chord
      const now = this.ctx.currentTime;

      frequencies.forEach((freq, idx) => {
        if (!this.ctx || !this.masterVolume) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        // Gentle vibrato
        const vibrato = this.ctx.createOscillator();
        const vibratoGain = this.ctx.createGain();
        vibrato.frequency.setValueAtTime(6, now);
        vibratoGain.gain.setValueAtTime(4, now);
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);
        vibrato.start();

        gain.gain.setValueAtTime(0.06, now);
        // Staggered decay
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.15);

        osc.connect(gain);
        gain.connect(this.masterVolume);

        osc.start();
        osc.stop(now + 2.0);
        
        setTimeout(() => {
          try {
            vibrato.stop();
          } catch(e) {}
        }, 2000);
      });
    } catch (error) {}
  }
}

// Export single instances singleton to share state across components
export const audioController = new SoundSynthesizer();
export default audioController;
