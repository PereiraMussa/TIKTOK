import React from 'react';
import { Upload as UploadIcon, Video, Music, Type } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Upload() {
  const { adminSettings } = useStore();

  return (
    <div className="h-full overflow-y-auto bg-black p-4 md:p-8 pb-24 md:pb-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-gray-900 rounded-3xl border border-gray-800 p-8">
        <h1 className="text-2xl font-bold mb-2">Upload Video</h1>
        <p className="text-gray-400 mb-8">Post a video to your account</p>

        <div className="border-2 border-dashed border-gray-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-gray-800/50 transition-colors cursor-pointer mb-8">
          <UploadIcon className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium mb-2">Select video to upload</p>
          <p className="text-sm text-gray-500 mb-6">Or drag and drop a file</p>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>MP4 or WebM</p>
            <p>720x1280 resolution or higher</p>
            <p>Up to 10 minutes</p>
            <p>Less than 2 GB</p>
          </div>

          <button 
            className="mt-8 px-8 py-3 rounded-xl font-bold text-white transition-transform hover:scale-105"
            style={{ backgroundColor: adminSettings.primaryColor }}
          >
            Select File
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-black rounded-xl border border-gray-800 hover:bg-gray-800 transition-colors">
            <Video className="w-6 h-6 mb-2 text-blue-500" />
            <span className="text-sm font-medium">Edit Video</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-black rounded-xl border border-gray-800 hover:bg-gray-800 transition-colors">
            <Music className="w-6 h-6 mb-2 text-purple-500" />
            <span className="text-sm font-medium">Add Sound</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-black rounded-xl border border-gray-800 hover:bg-gray-800 transition-colors">
            <Type className="w-6 h-6 mb-2 text-green-500" />
            <span className="text-sm font-medium">Add Text</span>
          </button>
        </div>
      </div>
    </div>
  );
}
