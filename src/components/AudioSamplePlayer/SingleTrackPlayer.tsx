import React from 'react';
import UnifiedImage from '@/components/UI/UnifiedImage';
import { PlayIcon, PauseIcon } from './Icons';
import PlaceholderImage from './PlaceholderImage';
import TimelineBar from './TimelineBar';
import VolumeControl from './VolumeControl';
import type { AudioSample } from './types';

interface SingleTrackPlayerProps {
  track: AudioSample;
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
  onTimelineChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMute: () => void;
}

const SingleTrackPlayer = ({
  track,
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
  onTimelineChange,
  onVolumeChange,
  onToggleMute,
}: SingleTrackPlayerProps) => {
  return (
    <div
      className='relative rounded-lg bg-gradient-to-br from-brand-white to-brand-white-dark overflow-hidden shadow-lg text-left'
      data-sanity-edit-target={documentId && documentType ? `${documentId}` : undefined}>
      {/* Main content area */}
      <div className='relative p-6'>
        {/* Image with overlaid play button */}
        <div className='relative w-full aspect-square mb-4 rounded-lg overflow-hidden group'>
          {track.image?.asset ? (
            <UnifiedImage
              src={track.image}
              alt={`${track.songName} artwork`}
              mode='fill'
              sizeContext='hero'
              objectFit='cover'
              documentId={track._id}
              documentType={track._type || 'audioSample'}
              fieldPath='image'
            />
          ) : (
            <PlaceholderImage />
          )}
          {/* Large play/pause button overlay */}
          <div className='absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors'>
            <button
              onClick={onPlayPause}
              className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 hover:bg-white border-4 border-brand-primary hover:scale-110 transition-all duration-200 flex items-center justify-center text-brand-primary shadow-2xl'
              aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <PauseIcon className='w-10 h-10 md:w-12 md:h-12' /> : <PlayIcon className='w-10 h-10 md:w-12 md:h-12' />}
            </button>
          </div>
        </div>

        {/* Track info */}
        <div className='text-center mb-4'>
          <h3 className='text-h3 mb-2'>{track.songName}</h3>
          <p className='text-body-lg text-brand-secondary mb-2'>{track.artistName}</p>
          {track.services && track.services.length > 0 && (
            <p className='text-body-sm text-subtle'>{track.services.join(' • ')}</p>
          )}
        </div>
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

export default SingleTrackPlayer;
