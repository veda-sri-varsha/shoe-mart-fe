const BASE_URL = '/products';

export const addProductUrl = `${BASE_URL}/`;
export const getAllProductsUrl = `${BASE_URL}/`;
export const getProductByIdUrl = (id: string) => `${BASE_URL}/${id}`;
export const updateProductUrl = (id: string) => `${BASE_URL}/${id}`;
export const deleteProductUrl = (id: string) => `${BASE_URL}/${id}`;
export const productsByCollectionUrl = (collectionId: string) => `${BASE_URL}/collection/${collectionId}`;
