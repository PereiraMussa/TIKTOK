import React from 'react';
import { Search, TrendingUp, Hash } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Explore() {
  const { videos, adminSettings } = useStore();

  return (
    <div className="h-full overflow-y-auto bg-black p-4 md:p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search accounts, videos, and hashtags" 
            className="w-full bg-gray-900 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gray-600 transition-colors"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
            Trending Now
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer">
                <img src={video.thumbnail} alt="Trending" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-medium line-clamp-2">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Hash className="w-5 h-5 mr-2 text-blue-500" />
            Popular Hashtags
          </h2>
          <div className="flex flex-wrap gap-3">
            {['#dance', '#comedy', '#tech', '#travel', '#food', '#fitness', '#music'].map((tag) => (
              <span key={tag} className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm font-medium hover:bg-gray-800 cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
