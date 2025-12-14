import { ApiResponse } from "../shared";

export type Product = {
  _id: string;
  // id:string;
  name: string;
  price: number;
  brand: string;
  badge?: string;
  description?: string;
  ratings: number;
  images: { url: string; public_id?: string }[];
  category: string;
  stock: number;
  sold: number;
  collectionId: string;
  isDeleted: boolean;
};

export type createProductPayload = Pick<
  Product,
  | "name"
  | "price"
  | "brand"
  | "description"
  | "ratings"
  | "images"
  | "category"
  | "stock"
  | "sold"
  | "collectionId"
>;

export type createProductResponse = ApiResponse<{ product: Product }>;

export type updateProductPayload = Partial<
  Pick<
    Product,
    | "name"
    | "price"
    | "brand"
    | "description"
    | "ratings"
    | "images"
    | "category"
    | "stock"
    | "sold"
    | "collectionId"
  >
> & { productId: string };

export type updateProductResponse = ApiResponse<{ product: Product }>;

export type deleteProductPayload = {
  productId: string;
};

export type deleteProductResponse = ApiResponse<{ product: Product }>;

export type getProductPayload = {
  productId: string;
};

export type getProductResponse = ApiResponse<{ product: Product }>;

export type getAllProductsPayload = {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  priceRange?: [number, number];
  ratings?: number;
  search?: string;
};

export type getAllProductsResponse = {
  products: Product[];
  totalProducts: number;
  page: number;
  limit: number;
};

export type getProductsByCollectionPayload = {
  collectionId: string;
  page?: number;
  limit?: number;
};

export type getProductsByCollectionResponse = ApiResponse<{
  products: Product[];
  total: number;
  page: number;
  limit: number;
}>;

export type searchProductsPayload = {
  query: string;
  page?: number;
  limit?: number;
};

export type searchProductsResponse = ApiResponse<{
  products: Product[];
  total: number;
  page: number;
  limit: number;
}>;

export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
};
