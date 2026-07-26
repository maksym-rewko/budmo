/**
 * Social + video links, verified against the live budmo.ca site.
 */
export const socialLinks = {
  youtube: 'https://www.youtube.com/@budmowinnipeg9893',
  instagram: 'https://www.instagram.com/budmowpg/',
  facebook: 'https://www.facebook.com/budmowpg/',
};

export interface VideoEmbed {
  youtubeId: string;
  title: string;
  poster: string;
}

export const videos: VideoEmbed[] = [
  { youtubeId: 'fCZUY9-L8i0', title: 'Budmo — Komaryk', poster: '/optimized/misc/video-poster-1.webp' },
  { youtubeId: 'fcw7JMDMYlQ', title: 'Budmo — Hey Ha Hopaka', poster: '/optimized/misc/video-poster-2.webp' },
];
