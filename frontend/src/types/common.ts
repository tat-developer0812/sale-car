// Strapi Image type
export interface StrapiImage {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: string;
  url: string;
}

// SEO type
export interface SEO {
  metaTitle: string;
  metaDescription: string;
  metaImage?: {
    data: {
      id: number;
      attributes: StrapiImage;
    };
  };
  keywords?: string;
  metaRobots?: string;
  structuredData?: unknown;
  metaViewport?: string;
  canonicalURL?: string;
}

// Pagination type
export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface PaginationMeta {
  pagination: Pagination;
}

// Strapi Response types
export interface StrapiResponse<T> {
  data: T;
  meta: PaginationMeta;
}

export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: Record<string, unknown>;
}

export interface StrapiCollectionResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta: PaginationMeta;
}

// Generic API Error
export interface APIError {
  status: number;
  name: string;
  message: string;
  details?: unknown;
}
