export interface Customer {
  id: number;
  customerCode: string;
  customerName: string;
  contactPerson?: string | null;
  mobileNo?: string | null;
  email?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;   // ASSUMED: remove if your Customer DTO has no city/state
  state?: string | null;
  country?: string | null;
  zipCode?: string | null;
  gstNo?: string | null;
  isDeleted?: boolean;
  isActive?: boolean | null;
  createdBy?: string | null;
  createdDate?: string | null;
  updatedBy?: string | null;
  updatedDate?: string | null;
}

export interface CustomerFilter {
  customerCode: string;
  customerName: string;
  mobileNo: string;
  city: string;
  isActive: boolean | null;
  pageNumber: number;
  pageSize: number;
}

export interface CustomerRequest {
  customerCode: string;
  customerName: string;
  mobileNo: string | null;
  city: string | null;
  state: string | null;
  isActive: boolean;
}
