const BASE_URL = '/collections';

export const getAllCollectionsUrl = `${BASE_URL}/`;
export const createCollectionUrl = `${BASE_URL}/`;
export const updateCollectionUrl = (id: string) => `${BASE_URL}/${id}`;
export const deleteCollectionUrl = (id: string) => `${BASE_URL}/${id}`; 
