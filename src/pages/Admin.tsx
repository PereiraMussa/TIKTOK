import React, { useState } from 'react';
import { Users, Settings, Video, Activity, ShieldAlert, Palette, LayoutDashboard, Search, MoreVertical, Trash2, Ban } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn, formatNumber } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'dashboard' | 'users' | 'content' | 'settings';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { users, videos, adminSettings, updateAdminSettings, deleteVideo, suspendUser } = useStore();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content', icon: Video },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-400 font-medium">Total Users</h3>
            <Users className="text-blue-500 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold mt-4">{Object.keys(users).length}</p>
          <p className="text-sm text-green-500 mt-2">+12% this week</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-400 font-medium">Active Videos</h3>
            <Video className="text-purple-500 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold mt-4">{videos.length}</p>
          <p className="text-sm text-green-500 mt-2">+5% this week</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-400 font-medium">Engagement Rate</h3>
            <Activity className="text-green-500 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold mt-4">24.8%</p>
          <p className="text-sm text-red-500 mt-2">-1.2% this week</p>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-black/50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="font-medium">Content Report #{1000 + i}</p>
                  <p className="text-sm text-gray-400">User reported video for inappropriate content</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-xl font-bold">User Management</h3>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="pl-10 pr-4 py-2 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-sm w-64"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Followers</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {Object.values(users).map((user) => (
              <tr key={user.id} className="hover:bg-black/20 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-xs text-gray-400">{user.bio.substring(0, 30)}...</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-1 rounded text-xs font-medium",
                    user.role === 'admin' ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"
                  )}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-gray-300">{formatNumber(user.followers)}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400">
                    Active
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => suspendUser(user.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Suspend User"
                  >
                    <Ban className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => {
        const user = users[video.userId];
        return (
          <div key={video.id} className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden group">
            <div className="relative aspect-[9/16] bg-black">
              <img src={video.thumbnail} alt="Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-sm font-medium text-white truncate">@{user?.username}</p>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2">{video.description}</p>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button 
                  onClick={() => deleteVideo(video.id)}
                  className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg backdrop-blur-sm transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 flex justify-between text-sm text-gray-400">
              <span>{formatNumber(video.likes)} likes</span>
              <span>{formatNumber(video.comments)} comments</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-2xl space-y-8">
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 space-y-6">
        <div className="flex items-center space-x-3 border-b border-gray-800 pb-4">
          <Palette className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-bold">Theme Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Primary Color</label>
            <div className="flex space-x-3">
              {['#ef4444', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'].map((color) => (
                <button
                  key={color}
                  onClick={() => updateAdminSettings({ primaryColor: color })}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110",
                    adminSettings.primaryColor === color ? "border-white" : "border-transparent"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Typography</label>
            <select 
              value={adminSettings.fontFamily}
              onChange={(e) => updateAdminSettings({ fontFamily: e.target.value })}
              className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Inter">Inter (Sans-serif)</option>
              <option value="Space Grotesk">Space Grotesk (Modern)</option>
              <option value="Playfair Display">Playfair Display (Serif)</option>
              <option value="JetBrains Mono">JetBrains Mono (Monospace)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Layout Density</label>
            <div className="flex space-x-4">
              <button
                onClick={() => updateAdminSettings({ layout: 'comfortable' })}
                className={cn(
                  "flex-1 py-3 rounded-lg border transition-colors",
                  adminSettings.layout === 'comfortable' 
                    ? "bg-blue-500/20 border-blue-500 text-blue-400" 
                    : "bg-black border-gray-800 text-gray-400 hover:border-gray-600"
                )}
              >
                Comfortable
              </button>
              <button
                onClick={() => updateAdminSettings({ layout: 'compact' })}
                className={cn(
                  "flex-1 py-3 rounded-lg border transition-colors",
                  adminSettings.layout === 'compact' 
                    ? "bg-blue-500/20 border-blue-500 text-blue-400" 
                    : "bg-black border-gray-800 text-gray-400 hover:border-gray-600"
                )}
              >
                Compact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto bg-black p-4 md:p-8 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage users, content, and platform settings.</p>
          </div>
          <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-white text-black"
                    : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'content' && renderContent()}
            {activeTab === 'settings' && renderSettings()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
