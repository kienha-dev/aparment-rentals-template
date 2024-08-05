"use server";

import { $api } from "../axios";
import { Apartment } from "./type";

export const getApartmentById = async (
  id: string
): Promise<Apartment | null> => {
  try {
    const { data } = await $api.get(`/apartment/${id}`);
    return data;
  } catch (err) {
    return null;
  }
};
