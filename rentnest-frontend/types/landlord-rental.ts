export interface LandlordTenant {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LandlordCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface LandlordProperty {
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
  category: LandlordCategory;
  landlord: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface LandlordRentalRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  status: string;
  moveInDate: string;
  createdAt: string;
  updatedAt: string;
  tenant: LandlordTenant;
  property: LandlordProperty;
}

export interface LandlordRentalRequestResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: LandlordRentalRequest[];
}

export interface UpdateRentalStatusRequest {
  status: "APPROVED" | "REJECTED";
}

export interface UpdateRentalStatusResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: LandlordRentalRequest;
}