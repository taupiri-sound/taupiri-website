import React from 'react';
import UnifiedImage from '@/components/UI/UnifiedImage';
import { PlayIcon, PauseIcon, SkipPreviousIcon, SkipNextIcon } from './Icons';
import PlaceholderImage from './PlaceholderImage';
import TimelineBar from './TimelineBar';
import VolumeControl from './VolumeControl';
import TrackListItem from './TrackListItem';
import type { AudioSample } from './types';

interface MultiTrackPlayerProps {
  tracks: AudioSample[];
  currentTrack: AudioSample;
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progressPercentage: number;
  volume: number;
  isMuted: boolean;
  isIOS: boolean;
  documentId?: string;
  documentType?: string;
  onPlayPause: () => void;
  onPlayTrack: (index: number) => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
  onTimelineChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMute: () => void;
}

const MultiTrackPlayer = ({
  tracks,
  currentTrack,
  currentTrackIndex,
  isPlaying,
  currentTime,
  duration,
  progressPercentage,
  volume,
  isMuted,
  isIOS,
  documentId,
  documentType,
  onPlayPause,
  onPlayTrack,
  onSkipNext,
  onSkipPrevious,
  onTimelineChange,
  onVolumeChange,
  onToggleMute,
}: MultiTrackPlayerProps) => {
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
              onClick={onSkipPrevious}
              disabled={currentTrackIndex === 0}
              className='p-2 rounded-full hover:bg-brand-primary/10 disabled:opacity-30 disabled:cursor-not-allowed text-brand-primary transition-colors'
              aria-label='Previous track'>
              <SkipPreviousIcon />
            </button>
            <button
              onClick={onPlayPause}
              className='w-12 h-12 rounded-full border-2 border-brand-primary bg-white hover:bg-brand-primary hover:text-white transition-all duration-200 flex items-center justify-center text-brand-primary'
              aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              onClick={onSkipNext}
              disabled={currentTrackIndex === tracks.length - 1}
              className='p-2 rounded-full hover:bg-brand-primary/10 disabled:opacity-30 disabled:cursor-not-allowed text-brand-primary transition-colors'
              aria-label='Next track'>
              <SkipNextIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className='divide-y divide-brand-primary/10'>
        {tracks.map((sample, index) => (
          <TrackListItem
            key={sample._id || index}
            sample={sample}
            index={index}
            isCurrentTrack={index === currentTrackIndex}
            onPlayTrack={onPlayTrack}
          />
        ))}
      </div>

      {/* Timeline bar - full width at bottom */}
      <div className='bg-brand-white-dark px-6 py-4 border-t border-brand-primary/10'>
        <TimelineBar
          currentTime={currentTime}
          duration={duration}
          progressPercentage={progressPercentage}
          onTimelineChange={onTimelineChange}
        />

        {/* Volume control */}
        {!isIOS && (
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={onVolumeChange}
            onToggleMute={onToggleMute}
          />
        )}
      </div>
    </div>
  );
};

export default MultiTrackPlayer;
