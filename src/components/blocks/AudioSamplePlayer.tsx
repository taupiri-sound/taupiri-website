'use client';

import React, { useRef, useState, useEffect } from 'react';
import UnifiedImage from '@/components/UI/UnifiedImage';

// Simple SVG icons
const PlayIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}>
    <path d='M8 5v14l11-7z' />
  </svg>
);

const PauseIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}>
    <path d='M6 4h4v16H6V4zm8 0h4v16h-4V4z' />
  </svg>
);

const SkipPreviousIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className='w-5 h-5'>
    <path d='M6 6h2v12H6zm3.5 6l8.5 6V6z' />
  </svg>
);

const SkipNextIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className='w-5 h-5'>
    <path d='M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z' />
  </svg>
);

const SpeakerLoudIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className='w-5 h-5'>
    <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
  </svg>
);

const SpeakerModerateIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className='w-5 h-5'>
    <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z' />
  </svg>
);

const SpeakerOffIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className='w-5 h-5'>
    <path d='M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' />
  </svg>
);

interface AudioSample {
  _id?: string;
  _type?: string;
  songName?: string;
  artistName?: string;
  services?: string[];
  image?: {
    asset?: { _ref?: string; _type?: string };
    alt?: string;
    hotspot?: unknown;
    crop?: unknown;
  };
  audioFile?: {
    asset?: {
      _id?: string;
      url?: string;
      mimeType?: string;
      size?: number;
      originalFilename?: string;
      duration?: number;
    };
  };
}

interface AudioSamplePlayerProps {
  audioSamples: AudioSample[];
  documentId?: string;
  documentType?: string;
}

// Placeholder image component for tracks without images
const PlaceholderImage = () => (
  <div className='w-full h-full bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 flex items-center justify-center'>
    <PlayIcon className='w-1/2 h-1/2 text-brand-primary/50' />
  </div>
);

const AudioSamplePlayer = ({ audioSamples, documentId, documentType }: AudioSamplePlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const validSamples = audioSamples?.filter(sample => sample?.audioFile?.asset?.url) || [];
  const currentTrack = validSamples[currentTrackIndex];
  const isSingleTrack = validSamples.length === 1;

  // Detect iOS devices where volume control doesn't work
  useEffect(() => {
    const checkIsIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(checkIsIOS);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      console.log('AudioSamplePlayer: No audio ref');
      return;
    }

    const updateTime = () => {
      console.log('AudioSamplePlayer: Time update', audio.currentTime, 'Duration:', audio.duration);
      setCurrentTime(audio.currentTime);
    };
    const updateDuration = () => {
      console.log('AudioSamplePlayer: Duration loaded', audio.duration);
      setDuration(audio.duration);
    };
    const handleEnded = () => {
      console.log('AudioSamplePlayer: Track ended');
      if (!isSingleTrack && currentTrackIndex < validSamples.length - 1) {
        // Auto-advance to next track
        setCurrentTrackIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    console.log('AudioSamplePlayer: Event listeners added, audio src:', audio.src);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, validSamples.length, isSingleTrack]);

  // Reset playback when track changes (NOT when play state changes)
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    // Load the new track's metadata
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      console.log('AudioSamplePlayer: Pausing');
      audioRef.current.pause();
    } else {
      console.log('AudioSamplePlayer: Playing');
      audioRef.current.play().catch((err) => {
        console.error('AudioSamplePlayer: Play failed', err);
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const playTrack = (index: number) => {
    console.log('AudioSamplePlayer: playTrack called with index', index);
    // Stop current track if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    // Switch to new track
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    // Start playing after a brief delay to let the track load
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.error('AudioSamplePlayer: Play failed in playTrack', err);
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }, 50);
  };

  const skipToNext = () => {
    if (currentTrackIndex < validSamples.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
    }
  };

  const skipToPrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1);
    }
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    console.log('AudioSamplePlayer: Timeline changed to', newTime);
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

  // Debug logging for progress
  useEffect(() => {
    console.log('AudioSamplePlayer: Progress update - currentTime:', currentTime, 'duration:', duration, 'percentage:', progressPercentage);
  }, [currentTime, duration, progressPercentage]);

  if (!currentTrack) {
    return (
      <div className='p-6 rounded-lg border-2 border-brand-primary/20 bg-brand-white'>
        <p className='text-body-base text-brand-primary'>No audio samples available</p>
      </div>
    );
  }

  // Single track layout - compact player with play button inside image
  if (isSingleTrack) {
    return (
      <div
        className='relative rounded-lg bg-gradient-to-br from-brand-white to-brand-white-dark overflow-hidden shadow-lg text-left'
        data-sanity-edit-target={documentId && documentType ? `${documentId}` : undefined}>
        {/* Main content area */}
        <div className='relative p-6'>
          {/* Image with overlaid play button */}
          <div className='relative w-full aspect-square mb-4 rounded-lg overflow-hidden group'>
            {currentTrack.image?.asset ? (
              <UnifiedImage
                src={currentTrack.image}
                alt={`${currentTrack.songName} artwork`}
                mode='fill'
                sizeContext='hero'
                objectFit='cover'
                documentId={currentTrack._id}
                documentType={currentTrack._type || 'audioSample'}
                fieldPath='image'
              />
            ) : (
              <PlaceholderImage />
            )}
            {/* Large play/pause button overlay */}
            <div className='absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors'>
              <button
                onClick={togglePlayPause}
                className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 hover:bg-white border-4 border-brand-primary hover:scale-110 transition-all duration-200 flex items-center justify-center text-brand-primary shadow-2xl'
                aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <PauseIcon className='w-10 h-10 md:w-12 md:h-12' /> : <PlayIcon className='w-10 h-10 md:w-12 md:h-12' />}
              </button>
            </div>
          </div>

          {/* Track info */}
          <div className='text-center mb-4'>
            <h3 className='text-h3 mb-2'>{currentTrack.songName}</h3>
            <p className='text-body-lg text-brand-secondary mb-2'>{currentTrack.artistName}</p>
            {currentTrack.services && currentTrack.services.length > 0 && (
              <p className='text-body-sm text-subtle'>{currentTrack.services.join(' • ')}</p>
            )}
          </div>
        </div>

        {/* Timeline bar - full width at bottom */}
        <div className='bg-brand-white-dark px-6 py-4 border-t border-brand-primary/10'>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-body-sm font-medium'>{formatTime(currentTime)}</span>
            <div className='relative flex-1 h-2 group'>
              <div className='absolute inset-0 bg-brand-primary/20 rounded-full' />
              <div
                className='absolute left-0 top-0 h-full bg-brand-primary rounded-full transition-all duration-150'
                style={{ width: `${progressPercentage}%` }}
              />
              <input
                type='range'
                min='0'
                max={duration || 0}
                value={currentTime}
                onChange={handleTimelineChange}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                aria-label='Audio timeline'
              />
              <div
                className='absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-primary rounded-full shadow-lg transition-all duration-150 opacity-0 group-hover:opacity-100 pointer-events-none'
                style={{ left: `calc(${progressPercentage}% - 0.5rem)` }}
              />
            </div>
            <span className='text-body-sm font-medium'>{formatTime(duration)}</span>
          </div>

          {/* Volume control */}
          {!isIOS && (
            <div className='flex items-center gap-3 mt-4 justify-center'>
              <button
                onClick={toggleMute}
                className='text-brand-primary hover:text-brand-secondary transition-colors'
                aria-label={isMuted ? 'Unmute' : 'Mute'}>
                {getVolumeIcon()}
              </button>
              <div className='relative w-32 h-2 group cursor-pointer'>
                <div className='absolute inset-0 bg-brand-primary/20 rounded-full pointer-events-none' />
                <div
                  className='absolute left-0 top-0 h-full bg-brand-primary rounded-full transition-all duration-150 pointer-events-none'
                  style={{ width: `${volume * 100}%` }}
                />
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='0.01'
                  value={volume}
                  onChange={handleVolumeChange}
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                  style={{ zIndex: 10 }}
                  aria-label='Volume'
                />
                <div
                  className='absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-primary rounded-full shadow-lg transition-all duration-150 opacity-0 group-hover:opacity-100 pointer-events-none'
                  style={{ left: `calc(${volume * 100}% - 0.5rem)` }}
                />
              </div>
              <span className='text-body-sm text-brand-secondary font-medium min-w-[3rem]'>
                {Math.round(volume * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={currentTrack.audioFile?.asset?.url} preload='metadata' />
      </div>
    );
  }

  // Multi-track layout - playlist view
  return (
    <div
      className='relative rounded-lg bg-gradient-to-br from-brand-white to-brand-white-dark overflow-hidden shadow-lg text-left'
      data-sanity-edit-target={documentId && documentType ? `${documentId}` : undefined}>
      {/* Currently playing track header */}
      <div className='bg-brand-white-dark border-b border-brand-primary/10 p-4'>
        <div className='flex items-center gap-4'>
          {/* Current track image */}
          <div className='relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0'>
            {currentTrack.image?.asset ? (
              <UnifiedImage
                src={currentTrack.image}
                alt={`${currentTrack.songName} artwork`}
                mode='fill'
                sizeContext='thumbnail'
                objectFit='cover'
                documentId={currentTrack._id}
                documentType={currentTrack._type || 'audioSample'}
                fieldPath='image'
              />
            ) : (
              <PlaceholderImage />
            )}
          </div>

          {/* Current track info */}
          <div className='flex-1 min-w-0'>
            <h3 className='text-h5 truncate'>{currentTrack.songName}</h3>
            <p className='text-body-base text-brand-secondary truncate'>{currentTrack.artistName}</p>
            {currentTrack.services && currentTrack.services.length > 0 && (
              <p className='text-body-sm text-subtle truncate'>{currentTrack.services.join(' • ')}</p>
            )}
          </div>

          {/* Playback controls */}
          <div className='flex items-center gap-2 flex-shrink-0'>
            <button
              onClick={skipToPrevious}
              disabled={currentTrackIndex === 0}
              className='p-2 rounded-full hover:bg-brand-primary/10 disabled:opacity-30 disabled:cursor-not-allowed text-brand-primary transition-colors'
              aria-label='Previous track'>
              <SkipPreviousIcon />
            </button>
            <button
              onClick={togglePlayPause}
              className='w-12 h-12 rounded-full border-2 border-brand-primary bg-white hover:bg-brand-primary hover:text-white transition-all duration-200 flex items-center justify-center text-brand-primary'
              aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              onClick={skipToNext}
              disabled={currentTrackIndex === validSamples.length - 1}
              className='p-2 rounded-full hover:bg-brand-primary/10 disabled:opacity-30 disabled:cursor-not-allowed text-brand-primary transition-colors'
              aria-label='Next track'>
              <SkipNextIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className='divide-y divide-brand-primary/10'>
        {validSamples.map((sample, index) => (
          <button
            key={sample._id || index}
            onClick={() => playTrack(index)}
            className={`w-full p-4 hover:bg-brand-primary/5 transition-colors text-left flex items-center gap-4 ${
              index === currentTrackIndex ? 'bg-brand-primary/10' : ''
            }`}>
            {/* Track image */}
            <div className='relative w-14 h-14 rounded overflow-hidden flex-shrink-0'>
              {sample.image?.asset ? (
                <UnifiedImage
                  src={sample.image}
                  alt={`${sample.songName} artwork`}
                  mode='fill'
                  sizeContext='thumbnail'
                  objectFit='cover'
                  documentId={sample._id}
                  documentType={sample._type || 'audioSample'}
                  fieldPath='image'
                />
              ) : (
                <PlaceholderImage />
              )}
            </div>

            {/* Track info */}
            <div className='flex-1 min-w-0'>
              <p className='text-body-base font-medium truncate'>{sample.songName}</p>
              <p className='text-body-sm text-brand-secondary truncate'>{sample.artistName}</p>
            </div>

            {/* Duration */}
            <div className='text-body-sm text-subtle flex-shrink-0'>
              {formatTime(sample.audioFile?.asset?.duration || 0)}
            </div>
          </button>
        ))}
      </div>

      {/* Timeline bar - full width at bottom */}
      <div className='bg-brand-white-dark px-6 py-4 border-t border-brand-primary/10'>
        <div className='flex items-center gap-3 mb-2'>
          <span className='text-body-sm font-medium'>{formatTime(currentTime)}</span>
          <div className='relative flex-1 h-2 group'>
            <div className='absolute inset-0 bg-brand-primary/20 rounded-full' />
            <div
              className='absolute left-0 top-0 h-full bg-brand-primary rounded-full transition-all duration-150'
              style={{ width: `${progressPercentage}%` }}
            />
            <input
              type='range'
              min='0'
              max={duration || 0}
              value={currentTime}
              onChange={handleTimelineChange}
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              aria-label='Audio timeline'
            />
            <div
              className='absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-primary rounded-full shadow-lg transition-all duration-150 opacity-0 group-hover:opacity-100 pointer-events-none'
              style={{ left: `calc(${progressPercentage}% - 0.5rem)` }}
            />
          </div>
          <span className='text-body-sm font-medium'>{formatTime(duration)}</span>
        </div>

        {/* Volume control */}
        {!isIOS && (
          <div className='flex items-center gap-3 mt-4 justify-center'>
            <button
              onClick={toggleMute}
              className='text-brand-primary hover:text-brand-secondary transition-colors'
              aria-label={isMuted ? 'Unmute' : 'Mute'}>
              {getVolumeIcon()}
            </button>
            <div className='relative w-32 h-2 group cursor-pointer'>
              <div className='absolute inset-0 bg-brand-primary/20 rounded-full pointer-events-none' />
              <div
                className='absolute left-0 top-0 h-full bg-brand-primary rounded-full transition-all duration-150 pointer-events-none'
                style={{ width: `${volume * 100}%` }}
              />
              <input
                type='range'
                min='0'
                max='1'
                step='0.01'
                value={volume}
                onChange={handleVolumeChange}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                style={{ zIndex: 10 }}
                aria-label='Volume'
              />
              <div
                className='absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-primary rounded-full shadow-lg transition-all duration-150 opacity-0 group-hover:opacity-100 pointer-events-none'
                style={{ left: `calc(${volume * 100}% - 0.5rem)` }}
              />
            </div>
            <span className='text-body-sm text-brand-secondary font-medium min-w-[3rem]'>
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={currentTrack.audioFile?.asset?.url} preload='metadata' />
    </div>
  );
};

export default AudioSamplePlayer;
