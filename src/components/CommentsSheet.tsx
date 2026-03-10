import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatNumber } from '../lib/utils';

export default function CommentsSheet() {
  const { activeCommentVideoId, setActiveCommentVideoId, videos, users } = useStore();
  const video = videos.find(v => v.id === activeCommentVideoId);

  return (
    <AnimatePresence>
      {activeCommentVideoId && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCommentVideoId(null)}
            className="absolute inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 h-[70%] bg-zinc-900 rounded-t-2xl z-50 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center p-4 border-b border-zinc-800">
              <div className="w-6" /> {/* Spacer */}
              <h3 className="text-sm font-bold text-white">{formatNumber(video?.comments || 0)} comments</h3>
              <button onClick={() => setActiveCommentVideoId(null)} className="p-1 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Mock Comments */}
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex space-x-3">
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="text-xs text-zinc-400 font-medium mb-1">user_{i}99</p>
                    <p className="text-sm text-white mb-1">This is such an amazing video! Keep it up 🔥</p>
                    <div className="flex space-x-4 text-xs text-zinc-500 mt-2">
                      <span>{i}d</span>
                      <button className="font-medium hover:text-white transition-colors">Reply</button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Heart className="w-4 h-4 text-zinc-500 hover:text-red-500 cursor-pointer transition-colors" />
                    <span className="text-xs text-zinc-500">{120 - i * 10}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-zinc-800 flex items-center space-x-3 bg-zinc-900">
              <img src={users['1']?.avatar} className="w-8 h-8 rounded-full object-cover" />
              <div className="flex-1 bg-zinc-800 rounded-full px-4 py-2.5 flex items-center">
                <input 
                  type="text" 
                  placeholder="Add comment..." 
                  className="bg-transparent border-none focus:outline-none text-sm w-full text-white placeholder:text-zinc-500"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
