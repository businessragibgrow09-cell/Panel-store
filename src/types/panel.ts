export interface PanelReview {
  id: string;
  author: string;
  badge: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PanelItem {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: 'aim' | 'macro' | 'fps' | 'all';
  categoryLabel: string;
  statusText: string;
  developer: string;
  developerTeam: string;
  iconUrl: string;
  previewUrl: string;
  installUrl: string;
  version: string;
  fileSize: string;
  downloadsCount: string;
  rating: number;
  reviewCount: number;
  heroHeadline: string;
  heroSubtitle: string;
  description: string;
  badges: string[];
  features: string[];
  compatibility: {
    android: string;
    ios: string;
    rootRequired: boolean;
    antiBanStatus: string;
    targetGame: string;
  };
  changelog: string[];
  reviews: PanelReview[];
}
