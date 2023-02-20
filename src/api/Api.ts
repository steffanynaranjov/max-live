import axios from "axios";

import { BASE_URL, API_KEY, DEFAULT_ID } from "../dependencies";
import { Genre, Artist } from "./types";

export const api = axios.create({ baseURL: BASE_URL });

const params = {
  apikey: API_KEY,
};

export const getGenres = async (
  query: string = ""
): Promise<Genre[] | unknown> => {
  try {
    const response = await api.get<Genre[]>(`/api/v1/music/genres?q=${query}`, {
      params,
    });
    return response.data;
  } catch (e: unknown) {
    return console.log(e);
  }
};

export const getArtistByGenre = async (
  id: number = DEFAULT_ID
): Promise<Artist[] | unknown> => {
  if (id === DEFAULT_ID) return;

  try {
    const response = await api.get<Artist[]>(
      `/api/v1/music/genres/${id}/artists`,
      {
        params,
      }
    );
    return response.data;
  } catch (e: unknown) {
    return console.log(e);
  }
};

export const getArtistDetails = async (id: number): Promise<Artist[]> => {
  const { data } = await api.get<any>(`/api/v1/music/artists/${id}`, {
    params,
  });
  return data;
};

export const getSimilarArtists = async (id: number): Promise<Artist[]> => {
  const { data } = await api.get<any>(`/api/v1/music/artists/${id}/similar`, {
    params,
  });
  return data;
};
