import { useState, useRef, useEffect } from 'react';
import { 
  PlayIcon, 
  PauseIcon, 
  ArrowDownTrayIcon,
  SpeakerWaveIcon 
} from '@heroicons/react/24/solid';

const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  // Debug log
  useEffect(() => {
    console.log('AudioPlayer received URL:', audioUrl);
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleError = (e) => {
      console.error('Audio loading error:', e);
      console.error('Audio src:', audio.src);
      console.error('Audio error code:', audio.error?.code);
      console.error('Audio error message:', audio.error?.message);
    };
    const handleCanPlay = () => {
      console.log('Audio can play:', audio.src);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [audioUrl]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      console.error('Audio ref is null');
      return;
    }
    
    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        console.log('Attempting to play audio...');
        await audio.play();
        setIsPlaying(true);
        console.log('Audio playing successfully');
      }
    } catch (err) {
      console.error('Error playing audio:', err);
      alert(`Failed to play audio: ${err.message}`);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `voiceflow-audio-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-strong rounded-2xl p-6 shadow-2xl animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                <SpeakerWaveIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-display font-bold text-slate-900 dark:text-slate-100">
                  Generated Audio
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ready to play
                </p>
              </div>
            </div>
            {/* Download button moved to header */}
            <button
              onClick={handleDownload}
              className="glass text-slate-700 dark:text-slate-200 font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 text-sm"
              aria-label="Download audio"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>

          <audio ref={audioRef} src={audioUrl} crossOrigin="anonymous" />

          {/* Colorful Waveform visualization */}
          <div className="mb-4 glass rounded-xl p-4 relative overflow-hidden bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/30 dark:to-accent-950/30">
            <div className="flex items-center justify-center gap-0.5 h-16">
              {[...Array(50)].map((_, i) => {
                const height = Math.random() * 70 + 30;
                const isActive = (i / 50) * 100 < progress;
                return (
                  <div
                    key={i}
                    className="w-1 rounded-full transition-all duration-200"
                    style={{ 
                      height: `${height}%`,
                      background: isActive 
                        ? 'linear-gradient(to top, #0ea5e9, #d946ef)'
                        : '#cbd5e1',
                      opacity: isActive ? 1 : 0.4,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Progress bar with time */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>

          {/* Controls - Compact layout */}
          <div className="flex items-center gap-4">
            {/* Play/Pause - Prominent */}
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transform hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6 ml-0.5" />
              )}
            </button>

            {/* Volume - Compact */}
            <div className="flex items-center gap-2 flex-1">
              <SpeakerWaveIcon className="w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={handleVolumeChange}
                className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400 w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioPlayer;