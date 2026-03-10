import React from 'react';
import { Settings, Share, Link as LinkIcon, Lock, Grid, Heart, Bookmark } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatNumber } from '../lib/utils';

export default function Profile() {
  const { currentUser, videos, adminSettings } = useStore();

  if (!currentUser) return null;

  const userVideos = videos.filter(v => v.userId === currentUser.id);

  return (
    <div className="h-full overflow-y-auto bg-black pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="p-4 md:p-8 flex flex-col items-center border-b border-gray-800">
          <div className="w-full flex justify-end mb-4 md:hidden">
            <button className="p-2 hover:bg-gray-900 rounded-full">
              <Settings className="w-6 h-6" />
            </button>
          </div>
          
          <img 
            src={currentUser.avatar} 
            alt={currentUser.username} 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-900 mb-4"
          />
          
          <h1 className="text-2xl font-bold mb-1">@{currentUser.username}</h1>
          <p className="text-gray-400 text-sm mb-4">{currentUser.bio}</p>

          <div className="flex space-x-6 mb-6">
            <div className="text-center">
              <p className="font-bold text-xl">{formatNumber(currentUser.following)}</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl">{formatNumber(currentUser.followers)}</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl">{formatNumber(currentUser.likes)}</p>
              <p className="text-sm text-gray-500">Likes</p>
            </div>
          </div>

          <div className="flex space-x-3 w-full max-w-sm">
            <button 
              className="flex-1 py-2 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: adminSettings.primaryColor }}
            >
              Edit Profile
            </button>
            <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex border-b border-gray-800">
          <button className="flex-1 py-4 flex justify-center border-b-2 border-white text-white">
            <Grid className="w-6 h-6" />
          </button>
          <button className="flex-1 py-4 flex justify-center text-gray-500 hover:text-gray-300 transition-colors">
            <Lock className="w-6 h-6" />
          </button>
          <button className="flex-1 py-4 flex justify-center text-gray-500 hover:text-gray-300 transition-colors">
            <Bookmark className="w-6 h-6" />
          </button>
          <button className="flex-1 py-4 flex justify-center text-gray-500 hover:text-gray-300 transition-colors">
            <Heart className="w-6 h-6" />
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-2 p-1 md:p-2">
          {userVideos.length > 0 ? (
            userVideos.map((video) => (
              <div key={video.id} className="relative aspect-[3/4] bg-gray-900 group cursor-pointer">
                <img src={video.thumbnail} alt="Video" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-sm font-medium drop-shadow-md">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatNumber(video.likes)}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-20 text-center text-gray-500">
              <p className="text-lg font-medium mb-2">No videos yet</p>
              <p className="text-sm">Upload your first video to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
