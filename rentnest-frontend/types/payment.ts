export interface PaymentProperty {
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
}

export interface PaymentRentalRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  status: string;
  moveInDate: string;
  createdAt: string;
  updatedAt: string;
  property: PaymentProperty;
  tenant: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Payment {
  id: string;
  rentalRequestId: string;
  amount: number;
  provider: string;
  transactionId: string;
  status: string;
  paidAt: string | null;
  createdAt: string;
  rentalRequest: PaymentRentalRequest;
}

export interface PaymentListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: Payment[];
}