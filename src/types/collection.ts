export type CollectionType = 'Owned' | 'Wishlist' | 'Selling';

export interface CollectionItem {
  id: string;
  title: string;
  image: string;
  category: string;
  condition: string;
  estimatedValue: number;
  acquiredDate: string;
  location: string;
  collectionType?: CollectionType;
}

