export type AdminLoginResponse = {
  message: string;
  username: string;
};

export type AdminMessageResponse = {
  message: string;
};

export type AdminDesignCategory = {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
};

export type AdminTattoo = {
  id: number;
  image_key: string;
  image_url: string;
  alt: string;
  featured: number;
  sort_order: number;
};

export type AdminDesign = {
  id: number;
  image_key: string;
  image_url: string;
  alt: string;
  category_id: number | null;
  category_slug: string | null;
  category_name: string | null;
  featured: number;
  sort_order: number;
};

export type AdminPrint = {
  id: number;
  image_key: string;
  image_url: string;
  alt: string;
  title: string | null;
  featured: number;
  sort_order: number;
};

export type UploadResponse = {
  image_key: string;
  image_url: string;
};

export type TattooInput = {
  image_key: string;
  alt: string;
  featured?: number;
  sort_order?: number;
};

export type TattooUpdate = Partial<Omit<TattooInput, "image_key">>;

export type DesignInput = {
  image_key: string;
  alt: string;
  category_id: number;
  featured?: number;
  sort_order?: number;
};

export type DesignUpdate = Partial<
  Omit<DesignInput, "image_key" | "category_id">
> & {
  category_id?: number;
};

export type PrintInput = {
  image_key: string;
  alt: string;
  title?: string;
  featured?: number;
  sort_order?: number;
};

export type PrintUpdate = Partial<Omit<PrintInput, "image_key">>;