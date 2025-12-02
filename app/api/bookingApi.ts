const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8088/api";

export interface BookingItem {
  id: number;
  tourId: number;
  tourName: string;
  departureDate: string;
  adultCount: number;
  childCount: number;
  infantCount: number;
  departureLocation: string;
  pricePerAdult: number;
  pricePerChild: number;
  pricePerInfant: number;
  subTotal: number;
}

export interface Booking {
  id: number;
  userId: number;
  items: BookingItem[];
  totalPrice: number;
  discount: number;
  finalPrice: number;
  paymentStatus: number;
  paymentMethodName: string;
  customerName: string;
  customerPhone: string;
  customerNote?: string;
  status: number;
  note?: string;
  createdAt?: string;
}

export interface BookingListResponse {
  data: Booking[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export const getBookings = async (offset = 0, limit = 10) => {
  const url = `${API_BASE_URL}/bookings?offset=${offset}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }
  const data: BookingListResponse = await res.json();
  return data;
};


