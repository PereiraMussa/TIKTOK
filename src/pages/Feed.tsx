import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/useStore';
import VideoPlayer from '../components/VideoPlayer';
import CommentsSheet from '../components/CommentsSheet';

export default function Feed() {
  const { videos } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const scrollPosition = container.scrollTop;
      const windowHeight = container.clientHeight;
      
      const newIndex = Math.round(scrollPosition / windowHeight);
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeIndex]);

  return (
    <div className="relative h-full w-full bg-black">
      {/* Top Bar Navigation */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-center items-center pt-12 pb-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <div className="flex space-x-6 text-white font-semibold text-lg drop-shadow-md pointer-events-auto">
          <span className="opacity-60 cursor-pointer hover:opacity-100 transition-opacity">Following</span>
          <span className="relative cursor-pointer">
            For You
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
          </span>
        </div>
      </div>
      
      {/* Feed Container */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {videos.map((video, index) => (
          <div key={video.id} className="h-full w-full snap-start relative">
            <VideoPlayer video={video} isActive={index === activeIndex} />
          </div>
        ))}
      </div>

      {/* Bottom Sheets */}
      <CommentsSheet />
    </div>
  );
}
