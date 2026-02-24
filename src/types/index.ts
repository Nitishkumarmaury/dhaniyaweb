export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  description: string;
  applications?: string[];
  catalogNumber?: string;
}

export type ProductCategory =
  | 'laboratory-chemicals'
  | 'laboratory-glassware'
  | 'lab-instruments'
  | 'consumables'
  | 'liquid-handling'
  | 'research-products';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  icon: string;
  brands: BrandInfo[];
}

export interface BrandInfo {
  name: string;
  logo?: string;
}

export interface InquiryFormData {
  name: string;
  company: string;
  gst?: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
}

export interface Inquiry extends InquiryFormData {
  _id?: string;
  createdAt: Date;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  notes?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface IndustryItem {
  name: string;
  icon: string;
  description: string;
}

export interface WhyChooseItem {
  title: string;
  description: string;
  icon: string;
}
