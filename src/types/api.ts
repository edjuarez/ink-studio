export type Tattoo = {
  id: number;
  image_key: string;
  image_url: string;
  alt: string;
  featured: number;
  sort_order: number;
};

export type Design = {
  id: number;
  image_key: string;
  image_url: string;
  alt: string;
  category: string | null;
  featured: number;
  sort_order: number;
};

export type Print = {
  id: number;
  image_key: string;
  image_url: string;
  alt: string;
  title: string | null;
  featured: number;
  sort_order: number;
};