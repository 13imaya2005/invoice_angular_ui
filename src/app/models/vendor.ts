export interface Vendor {
  id?: number;
  vendorCode: string;
  vendorName: string;
  contactPerson?: string;
  mobileNo?: string;
  email?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  gstNo?: string;
  isActive: boolean;
  isDeleted?: boolean;
  createdBy?: string;
  createdDate?: Date;
  updatedBy?: string;
  updatedDate?: Date;
}