export type GetApartmentsParams = {
  keyword?: string;
  minPrice?: string;
  maxPrice?: string;
  minSize?: string;
  maxSize?: string;
};

export type CreateApartmentPayload = {
  title: string;
  description: string;
  previewImage: string;
  price: number;
  areaSize: number;
  roomNo: string;
};

export type UpdateApartmentPayload = CreateApartmentPayload;

export type Media = {
  id: string;
  url: string;
};

export type Apartment = {
  id: string;
  title: string;
  roomNo: string;
  price: string;
  areaSize: string;
  previewImage: string;
  description?: string;
  isFavorite?: boolean;
};
