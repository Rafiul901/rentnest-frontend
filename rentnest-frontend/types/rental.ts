export interface RentalTenant {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface RentalCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface RentalLandlord {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface RentalProperty {
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
  category: RentalCategory;
  landlord: RentalLandlord;
}

export interface Rental {
  id: string;
  tenantId: string;
  propertyId: string;
  status: string;
  moveInDate: string;
  createdAt: string;
  updatedAt: string;
  tenant: RentalTenant;
  property: RentalProperty;
}

export interface RentalListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: Rental[];
}