import React from 'react'
import MuxPlayer from '@mux/mux-player-react'

const HeroVideo = ({playbackId, poster}: { playbackId?: string; poster?: string }) => {
  return (
    <MuxPlayer
      streamType="on-demand"
      playsInline
      playbackId={playbackId}
      poster={poster}
      className="absolute inset-0 h-full w-full border-0"
      autoPlay
      muted
      loop
      nohotkeys
      minResolution='720p'
      maxResolution='720p'
      preload='auto'
    />
  )
}

export default HeroVideo
