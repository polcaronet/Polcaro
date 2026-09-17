// src/app/models/portfolio.models.ts

export interface LiveVideo {
  id: string;
  title: string;
  desc: string;
  hashtags: string[];
  views: string;
  likes: string;
  duration: string;
  durationSec: number;
  date: string;
  tags: string[];
}

export interface TimelineItem {
  type: 'work' | 'edu' | 'award' | 'stream' | 'game' | 'community' | 'rocket';
  year: string;
  title: string;
  place: string;
  desc: string;
  category?: string;
}

export interface NavLink {
  path: string;
  label: string;
  icon: string;
  badge?: { text: string; type: 'red' | 'green' | 'yellow' | 'purple' };
}
