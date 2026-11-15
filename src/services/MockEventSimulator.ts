import { useActivityStore } from '../store/useActivityStore';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let intervalId: ReturnType<typeof setInterval> | null = null;

export const MockEventSimulator = {
  isRunning: false as boolean,
  musicInterval: null as ReturnType<typeof setInterval> | null,
  timerInterval: null as ReturnType<typeof setInterval> | null,
  callInterval: null as ReturnType<typeof setInterval> | null,
  downloadInterval: null as ReturnType<typeof setInterval> | null,

  startMusicSimulation() {
    const tracks = [
      { title: 'Midnight City', subtitle: 'M83', albumArt: 'https://picsum.photos/seed/midnight/300/300' },
      { title: 'Blinding Lights', subtitle: 'The Weeknd', albumArt: 'https://picsum.photos/seed/blinding/300/300' },
      { title: 'Bohemian Rhapsody', subtitle: 'Queen', albumArt: 'https://picsum.photos/seed/bohemian/300/300' },
      { title: 'Mr. Brightside', subtitle: 'The Killers', albumArt: 'https://picsum.photos/seed/brightside/300/300' },
      { title: 'Somebody Like You', subtitle: 'Keith Urban', albumArt: 'https://picsum.photos/seed/somebody/300/300' },
    ];

    let trackIndex = 0;

    this.musicInterval = setInterval(() => {
      const track = tracks[trackIndex];
      useActivityStore.getState().addActivity({
        id: `music-${uuidv4()}`,
        type: 'music',
        title: track.title,
        subtitle: track.subtitle,
        accentColor: '#30D158',
        payload: { albumArt: track.albumArt, isPlaying: true },
      });

      trackIndex = (trackIndex + 1) % tracks.length;

      // Remove after 30 seconds
      setTimeout(() => {
        const activities = useActivityStore.getState().activeActivities;
        const musicActivity = activities.find(a => a.type === 'music');
        if (musicActivity) {
          useActivityStore.getState().removeActivity(musicActivity.id);
        }
      }, 30000);
    }, 30000);
  },

  stopMusicSimulation() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  },

  startTimerSimulation() {
    const duration = 60000; // 1 minute
    const startTime = Date.now();

    useActivityStore.getState().addActivity({
      id: 'timer-1',
      type: 'timer',
      title: 'Countdown Timer',
      accentColor: '#FF3B30',
      payload: { remaining: duration, duration, active: false, startTime, stopwatchActive: false, elapsed: 0 },
    });
  },

  startCallSimulation(duration: number = 30000) {
    const startTime = Date.now();

    useActivityStore.getState().addActivity({
      id: `call-${uuidv4()}`,
      type: 'call',
      title: 'Test Call',
      subtitle: 'Demo Call',
      accentColor: '#0A84FF',
      payload: { duration: 0, startTime, muted: false, active: true },
    });

    setTimeout(() => {
      const activities = useActivityStore.getState().activeActivities;
      const callActivity = activities.find(a => a.type === 'call');
      if (callActivity) {
        useActivityStore.getState().removeActivity(callActivity.id);
      }
    }, duration);
  },

  startDownloadSimulation() {
    useActivityStore.getState().addActivity({
      id: `download-${uuidv4()}`,
      type: 'download',
      title: 'file.zip',
      accentColor: '#AF52DE',
      payload: { progress: 0, completed: false },
    });

    // Simulate download progress
    this.downloadInterval = setInterval(() => {
      const activities = useActivityStore.getState().activeActivities;
      const downloadActivity = activities.find(a => a.type === 'download');
      if (downloadActivity && downloadActivity.payload) {
        const progress = Math.min(100, (downloadActivity.payload.progress as number) + 10);
        useActivityStore.getState().addActivity({
          ...downloadActivity,
          payload: { ...downloadActivity.payload, progress },
        });
        if (progress >= 100) {
          if (this.downloadInterval) {
            clearInterval(this.downloadInterval);
            this.downloadInterval = null;
          }
          useActivityStore.getState().showTransient('Download complete!');
        }
      }
    }, 500);
  },

  stopDownloadSimulation() {
    if (this.downloadInterval) {
      clearInterval(this.downloadInterval);
      this.downloadInterval = null;
    }
  },

  // System event simulations for transient HUD
  simulateVolumeChange(volume: number) {
    useActivityStore.getState().showTransient(`Volume: ${volume}%`);
  },

  simulateBrightnessChange(brightness: number) {
    useActivityStore.getState().showTransient(`Brightness: ${brightness}%`);
  },

  simulateNetworkChange() {
    useActivityStore.getState().showTransient('Connected to Wi-Fi');
  },

  stopAll() {
    this.stopMusicSimulation();
    this.stopDownloadSimulation();
    useActivityStore.getState().clearActivities();
  },
};