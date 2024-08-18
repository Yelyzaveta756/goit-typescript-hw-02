import axios from "axios";

const accessKey = 'HNh41ViAzvzccaIznC1RSnL6Udn725Y-OYS1HAbxdFc';
axios.defaults.baseURL = "https://api.unsplash.com";

export interface ImageResult {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
}

interface FetchImagesResponse {
  results: ImageResult[];
  total_pages: number; 
}

export const fetchImages = async (topic: string, currentPage: number): Promise<{ results: ImageResult[], totalPages: number }> => {
  const response = await axios.get<FetchImagesResponse>(`search/photos`, {
    params: { 
      query: topic,
      page: currentPage,
      per_page: 15,
    },
    headers: {
      Authorization: `Client-ID ${accessKey}`
    }
  });

  return { results: response.data.results, totalPages: response.data.total_pages };
}
