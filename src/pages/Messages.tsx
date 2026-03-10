import React from 'react';
import { Search, Edit, MoreHorizontal, Send } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Messages() {
  const { users, currentUser } = useStore();

  const mockChats = [
    { id: '1', userId: '2', lastMessage: 'That video was hilarious! 😂', time: '10m', unread: 2 },
    { id: '2', userId: '3', lastMessage: 'Are you going to the event?', time: '2h', unread: 0 },
  ];

  return (
    <div className="h-full flex flex-col md:flex-row bg-black pb-16 md:pb-0">
      {/* Chat List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-800 flex flex-col h-full">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">Messages</h2>
          <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
            <Edit className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search messages" 
              className="w-full bg-gray-900 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {mockChats.map((chat) => {
            const user = users[chat.userId];
            return (
              <div key={chat.id} className="flex items-center p-4 hover:bg-gray-900 cursor-pointer transition-colors border-b border-gray-900/50">
                <img src={user?.avatar} alt={user?.username} className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-white truncate">{user?.username}</p>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="ml-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                    {chat.unread}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area (Hidden on mobile by default) */}
      <div className="hidden md:flex flex-1 flex-col bg-black">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <img src={users['2']?.avatar} alt="User" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-bold">{users['2']?.username}</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex justify-center">
            <span className="text-xs text-gray-500 bg-gray-900 px-3 py-1 rounded-full">Today</span>
          </div>
          
          <div className="flex items-end space-x-2">
            <img src={users['2']?.avatar} alt="User" className="w-8 h-8 rounded-full" />
            <div className="bg-gray-800 rounded-2xl rounded-bl-sm p-3 max-w-[70%]">
              <p className="text-sm">Hey! Did you see the new trending challenge?</p>
            </div>
          </div>

          <div className="flex items-end justify-end space-x-2">
            <div className="bg-blue-600 rounded-2xl rounded-br-sm p-3 max-w-[70%]">
              <p className="text-sm">Yes! I'm planning to record my version today. 🎥</p>
            </div>
          </div>

          <div className="flex items-end space-x-2">
            <img src={users['2']?.avatar} alt="User" className="w-8 h-8 rounded-full" />
            <div className="bg-gray-800 rounded-2xl rounded-bl-sm p-3 max-w-[70%]">
              <p className="text-sm">That video was hilarious! 😂</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-800 bg-black">
          <div className="flex items-center space-x-2 bg-gray-900 rounded-full px-4 py-2">
            <input 
              type="text" 
              placeholder="Send a message..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2"
            />
            <button className="p-2 text-blue-500 hover:bg-gray-800 rounded-full transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
