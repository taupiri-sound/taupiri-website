import { defineField, defineType } from 'sanity';
import { PlayIcon } from '@sanity/icons';

export const audioSamplePlayerType = defineType({
  name: 'audioSamplePlayer',
  title: 'Audio Sample Player',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'audioSample',
      title: 'Select Audio Sample',
      type: 'reference',
      to: [{ type: 'audioSample' }],
      description: 'Select an audio sample to display with a custom player',
      validation: (Rule) => Rule.required().error('Please select an audio sample'),
    }),
  ],
  preview: {
    select: {
      songName: 'audioSample.songName',
      artistName: 'audioSample.artistName',
      image: 'audioSample.image',
    },
    prepare({ songName, artistName, image }) {
      return {
        title: songName || 'Audio Sample Player',
        subtitle: artistName ? `Artist: ${artistName}` : 'No audio sample selected',
        media: image || PlayIcon,
      };
    },
  },
});
