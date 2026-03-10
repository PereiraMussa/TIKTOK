import { create } from 'zustand';

export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  likes: number;
  isVerified: boolean;
  role: 'user' | 'admin';
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  likes: number;
  createdAt: string;
}

export interface Video {
  id: string;
  userId: string;
  url: string;
  thumbnail: string;
  description: string;
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  music: string;
  createdAt: string;
}

export interface AdminSettings {
  primaryColor: string;
  fontFamily: string;
  layout: 'compact' | 'comfortable';
}

interface AppState {
  currentUser: User | null;
  users: Record<string, User>;
  videos: Video[];
  adminSettings: AdminSettings;
  setCurrentUser: (user: User) => void;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
  likeVideo: (videoId: string) => void;
  deleteVideo: (videoId: string) => void;
  suspendUser: (userId: string) => void;
  activeCommentVideoId: string | null;
  setActiveCommentVideoId: (id: string | null) => void;
}

const mockUsers: Record<string, User> = {
  '1': {
    id: '1',
    username: 'admin_user',
    avatar: 'https://i.pravatar.cc/150?u=1',
    bio: 'Platform Admin',
    followers: 10000,
    following: 50,
    likes: 50000,
    isVerified: true,
    role: 'admin',
  },
  '2': {
    id: '2',
    username: 'creator_anna',
    avatar: 'https://i.pravatar.cc/150?u=2',
    bio: 'Dance & Lifestyle 💃',
    followers: 150000,
    following: 120,
    likes: 2000000,
    isVerified: true,
    role: 'user',
  },
  '3': {
    id: '3',
    username: 'tech_guru',
    avatar: 'https://i.pravatar.cc/150?u=3',
    bio: 'Tech reviews and tips 💻',
    followers: 85000,
    following: 300,
    likes: 450000,
    isVerified: false,
    role: 'user',
  },
};

const mockVideos: Video[] = [
  {
    id: 'v1',
    userId: '2',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    description: 'Check out this amazing view! 🌅 #nature #travel',
    hashtags: ['nature', 'travel'],
    likes: 12500,
    comments: 342,
    shares: 120,
    music: 'Original Sound - creator_anna',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'v2',
    userId: '3',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
    description: 'The future of tech is here 🚀 #tech #future',
    hashtags: ['tech', 'future'],
    likes: 8900,
    comments: 210,
    shares: 45,
    music: 'Tech Vibes - tech_guru',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'v3',
    userId: '2',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
    description: 'Weekend getaway vibes 🌴 #vacation',
    hashtags: ['vacation'],
    likes: 45000,
    comments: 1200,
    shares: 890,
    music: 'Summer Hits 2026',
    createdAt: new Date().toISOString(),
  },
];

export const useStore = create<AppState>((set) => ({
  currentUser: mockUsers['1'],
  users: mockUsers,
  videos: mockVideos,
  adminSettings: {
    primaryColor: '#ef4444', // red-500
    fontFamily: 'Inter',
    layout: 'comfortable',
  },
  setCurrentUser: (user) => set({ currentUser: user }),
  updateAdminSettings: (settings) =>
    set((state) => ({ adminSettings: { ...state.adminSettings, ...settings } })),
  likeVideo: (videoId) =>
    set((state) => ({
      videos: state.videos.map((v) =>
        v.id === videoId ? { ...v, likes: v.likes + 1 } : v
      ),
    })),
  deleteVideo: (videoId) =>
    set((state) => ({
      videos: state.videos.filter((v) => v.id !== videoId),
    })),
  suspendUser: (userId) =>
    set((state) => {
      const newUsers = { ...state.users };
      delete newUsers[userId];
      return { users: newUsers };
    }),
  activeCommentVideoId: null,
  setActiveCommentVideoId: (id) => set({ activeCommentVideoId: id }),
}));
