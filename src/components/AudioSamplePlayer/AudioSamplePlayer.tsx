'use client';

import React, { useRef, useState, useEffect } from 'react';
import UnifiedImage from '@/components/UI/UnifiedImage';

// Simple SVG icons
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
  </svg>
);

const SpeakerLoudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

const SpeakerModerateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
  </svg>
);

const SpeakerOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

interface AudioSamplePlayerProps {
  songName: string;
  artistName: string;
  services: string[];
  image?: {
    asset?: { _ref?: string; _type?: string };
    alt?: string;
    hotspot?: unknown;
    crop?: unknown;
  };
  audioFile: {
    asset?: {
      _id?: string;
      url?: string;
      mimeType?: string;
      size?: number;
      originalFilename?: string;
      duration?: number;
    };
  };
  documentId?: string;
  documentType?: string;
}

const AudioSamplePlayer = ({
  songName,
  artistName,
  services,
  image,
  audioFile,
  documentId,
  documentType,
}: AudioSamplePlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const audioUrl = audioFile?.asset?.url;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.7);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <SpeakerOffIcon />;
    if (volume < 0.5) return <SpeakerModerateIcon />;
    return <SpeakerLoudIcon />;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!audioUrl) {
    return (
      <div className="p-6 rounded-lg border-2 border-brand-primary/20 bg-brand-white">
        <h3 className="text-h4 text-brand-secondary mb-2">{songName}</h3>
        <p className="text-body-base text-body mb-2">{artistName}</p>
        <p className="text-body-sm text-subtle mb-4">{services.join(' • ')}</p>
        <p className="text-body-base text-brand-primary">
          Audio file not available
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-lg border-2 border-brand-primary/20 bg-brand-white overflow-hidden shadow-lg"
      data-sanity-edit-target={documentId && documentType ? `${documentId}` : undefined}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
        {/* Image Section */}
        {image?.asset && (
          <div className="flex-shrink-0 w-full md:w-48 h-48 rounded-lg overflow-hidden bg-brand-secondary/10">
            <UnifiedImage
              src={image}
              alt={`${songName} artwork`}
              mode="fill"
              sizeContext="card"
              objectFit="cover"
              documentId={documentId}
              documentType={documentType}
              fieldPath="image"
            />
          </div>
        )}

        {/* Info and Controls Section */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Title and Artist */}
          <div className="mb-4">
            <h3 className="text-h4 text-brand-secondary mb-1 truncate">{songName}</h3>
            <p className="text-body-base text-body mb-2">{artistName}</p>
            <p className="text-body-sm text-subtle">
              {services.join(' • ')}
            </p>
          </div>

          {/* Audio Controls */}
          <div className="space-y-3">
            {/* Timeline */}
            <div className="flex items-center gap-3">
              <span className="text-body-sm text-brand-secondary font-medium min-w-[3rem] text-right">
                {formatTime(currentTime)}
              </span>
              <div className="relative flex-1 h-2 group">
                <div className="absolute inset-0 bg-brand-primary/20 rounded-full" />
                <div
                  className="absolute left-0 top-0 h-full bg-brand-primary rounded-full transition-all duration-150"
                  style={{ width: `${progressPercentage}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleTimelineChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Audio timeline"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-primary rounded-full shadow-lg transition-all duration-150 opacity-0 group-hover:opacity-100"
                  style={{ left: `calc(${progressPercentage}% - 0.5rem)` }}
                />
              </div>
              <span className="text-body-sm text-brand-secondary font-medium min-w-[3rem]">
                {formatTime(duration)}
              </span>
            </div>

            {/* Play/Pause and Volume Controls */}
            <div className="flex items-center gap-4">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-brand-primary bg-white hover:bg-brand-primary hover:text-white transition-all duration-200 flex items-center justify-center text-brand-primary group"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              {/* Volume Control */}
              <div className="flex items-center gap-2 flex-1 max-w-xs">
                <button
                  onClick={toggleMute}
                  className="text-brand-primary hover:text-brand-secondary transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {getVolumeIcon()}
                </button>
                <div className="relative flex-1 h-2 group">
                  <div className="absolute inset-0 bg-brand-primary/20 rounded-full" />
                  <div
                    className="absolute left-0 top-0 h-full bg-brand-primary rounded-full transition-all duration-150"
                    style={{ width: `${volume * 100}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Volume"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-primary rounded-full shadow-lg transition-all duration-150 opacity-0 group-hover:opacity-100"
                    style={{ left: `calc(${volume * 100}% - 0.5rem)` }}
                  />
                </div>
                <span className="text-body-sm text-brand-secondary font-medium min-w-[3rem]">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  );
};

export default AudioSamplePlayer;
