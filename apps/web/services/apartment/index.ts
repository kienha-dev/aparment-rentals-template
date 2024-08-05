"use client";

import { $api } from "../axios";
import { Apartment, GetApartmentsParams, UpdateApartmentPayload } from "./type";

const getAllApartments = async (
  searchParams?: GetApartmentsParams
): Promise<Apartment[]> => {
  try {
    const searchQuery = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, values]) =>
        searchQuery.append(key, values.toString())
      );
    }
    const { data } = await $api.get(`/apartment?${searchQuery.toString()}`);
    return data;
  } catch (err) {
    return [];
  }
};

const getMyApartments = async (): Promise<Apartment[]> => {
  try {
    const { data } = await $api.get("/apartment/me");
    return data;
  } catch (err) {
    return [];
  }
};

const getApartmentById = async (id: string): Promise<Apartment | null> => {
  try {
    const { data } = await $api.get(`/apartment/${id}`);
    return data;
  } catch (err) {
    return null;
  }
};

const createApartment = async (payload: UpdateApartmentPayload) => {
  try {
    const { data } = await $api.post(`/apartment`, { ...payload });
    return data;
  } catch (err) {
    throw err;
  }
};

const updateApartmentById = (id: string, payload: UpdateApartmentPayload) => {
  return $api.patch(`/apartment/${id}`, { ...payload });
};

const deleteApartmentById = (id: string) => {
  return $api.delete(`/apartment/${id}`);
};

const getAllFavorite = async (): Promise<Apartment[]> => {
  try {
    const { data } = await $api.get("/apartment/favorite");
    return data;
  } catch (err) {
    return [];
  }
};

const addApartmentToFavorite = (apartmentId: string) => {
  return $api.post(`/apartment/favorite/${apartmentId}`);
};

const removeApartmentFromFavorite = (apartmentId: string) => {
  return $api.delete(`/apartment/favorite/${apartmentId}`);
};

export {
  getAllApartments,
  getMyApartments,
  getApartmentById,
  createApartment,
  updateApartmentById,
  deleteApartmentById,
  getAllFavorite,
  addApartmentToFavorite,
  removeApartmentFromFavorite,
};
