export interface PropertyLandlord {
  id: string;
  name: string;
  email: string;
}

export interface PropertyCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  available: boolean;
  landlordId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  landlord: PropertyLandlord;
  category: PropertyCategory;
}

export interface PropertyResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: Property[];
}

export interface PropertyDetailResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Property;
}