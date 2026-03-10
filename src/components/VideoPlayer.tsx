import React, { useRef, useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Music, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, Video } from '../store/useStore';
import { formatNumber, cn } from '../lib/utils';

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
}

export default function VideoPlayer({ video, isActive }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const { users, likeVideo, setActiveCommentVideoId } = useStore();
  
  const user = users[video.userId];
  const isLiked = false; // In a real app, check if current user liked it

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    likeVideo(video.id);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  return (
    <div className="relative w-full h-full bg-black snap-start flex items-center justify-center overflow-hidden">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={video.url}
        poster={video.thumbnail}
        className="w-full h-full object-cover"
        loop
        playsInline
        onClick={togglePlay}
        onDoubleClick={handleDoubleClick}
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10">
          <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
          </div>
        </div>
      )}

      {/* Double Tap Heart Animation */}
      <AnimatePresence>
        {showHeart && (
          <motion.div
            initial={{ scale: 0, opacity: 1, rotate: -15 }}
            animate={{ scale: 1.2, opacity: 0, y: -100 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <Heart className="w-32 h-32 text-red-500 fill-red-500 drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Actions Bar */}
      <div className="absolute right-2 bottom-20 flex flex-col items-center space-y-5 z-40">
        <div className="relative w-12 h-12 mb-2 cursor-pointer active:scale-95 transition-transform">
          <img 
            src={user?.avatar} 
            alt={user?.username} 
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-lg font-bold leading-none pb-0.5 shadow-md">
            +
          </div>
        </div>

        <button 
          onClick={() => likeVideo(video.id)}
          className="flex flex-col items-center group"
        >
          <Heart className={cn("w-9 h-9 drop-shadow-lg transition-transform active:scale-75", isLiked ? "text-red-500 fill-red-500" : "text-white fill-black/20")} />
          <span className="text-white text-xs font-semibold drop-shadow-md mt-1">{formatNumber(video.likes)}</span>
        </button>

        <button 
          onClick={() => setActiveCommentVideoId(video.id)}
          className="flex flex-col items-center group"
        >
          <MessageCircle className="w-9 h-9 text-white fill-black/20 drop-shadow-lg active:scale-75 transition-transform" />
          <span className="text-white text-xs font-semibold drop-shadow-md mt-1">{formatNumber(video.comments)}</span>
        </button>

        <button className="flex flex-col items-center group">
          <Bookmark className="w-9 h-9 text-white fill-black/20 drop-shadow-lg active:scale-75 transition-transform" />
          <span className="text-white text-xs font-semibold drop-shadow-md mt-1">Save</span>
        </button>

        <button className="flex flex-col items-center group">
          <Share2 className="w-9 h-9 text-white fill-black/20 drop-shadow-lg active:scale-75 transition-transform" />
          <span className="text-white text-xs font-semibold drop-shadow-md mt-1">{formatNumber(video.shares)}</span>
        </button>

        <div className="w-12 h-12 rounded-full bg-zinc-800 border-[8px] border-zinc-800 animate-spin-slow mt-4 flex items-center justify-center overflow-hidden shadow-lg">
          <img src={user?.avatar} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Bottom Info Area */}
      <div className="absolute bottom-0 left-0 right-16 p-4 pb-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-30">
        <h3 className="text-white font-bold text-base mb-1 drop-shadow-md">@{user?.username}</h3>
        <p className="text-white text-sm mb-3 drop-shadow-md line-clamp-2">
          {video.description} <span className="font-bold">{video.hashtags.map(h => `#${h}`).join(' ')}</span>
        </p>
        <div className="flex items-center space-x-2 text-white overflow-hidden w-48">
          <Music className="w-4 h-4 shrink-0" />
          <div className="animate-marquee whitespace-nowrap text-sm font-medium">
            {video.music} • {video.music} • 
          </div>
        </div>
      </div>
    </div>
  );
}
