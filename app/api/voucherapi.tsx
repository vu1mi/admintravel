const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8088/api";

// const USERS_ENDPOINT = `${API_BASE_URL}/users`;

export interface VoucherDetail {

  id: number;
  code: string;
  description: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  minPurchaseAmount: number;
  maxDiscountAmount: number;
  validFrom: [number, number, number, number, number];
  validTo: [number, number, number, number, number, number];
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
}
// export interface VoucherResponse {
//   data: VoucherDetail[];
// }

export const getVouchers = async (): Promise<VoucherDetail[]> => {
  const res = await fetch(`${API_BASE_URL}/vouchers`);  
    if (!res.ok) {
    throw new Error("Failed to get vouchers!");
    }
    const data: VoucherDetail[] = await res.json();
    return data;
};
export const getVoucherById = async (id: number): Promise<VoucherDetail> => {
  const res = await fetch(`${API_BASE_URL}/vouchers/${id}`);
    if (!res.ok) {
    throw new Error("Failed to get voucher by id!");
    }   
    const data: VoucherDetail = await res.json();
    return data;
};

export const deleteVoucher = async (id: number): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/vouchers/${id}//remove-voucher`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete voucher!");
  } 
};