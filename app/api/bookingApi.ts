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
  created_at?: number[]
}

export interface BookingListResponse {
  data: Booking[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export const getBookings = async (
  offset = 0,
  limit = 10,
  paymentStatus: number | undefined,
  name?: string | undefined,
  dateFrom?: string | undefined,
  dateTo?: string | undefined
) => {
  const params = new URLSearchParams();
  params.set("offset", String(offset));
  params.set("limit", String(limit));
  if (paymentStatus !== undefined) params.set("paymentStatus", String(paymentStatus));
  if (name) params.set("name", name);
  if (dateFrom) params.set("dateFrom", dateFrom);
  if (dateTo) params.set("dateTo", dateTo);

  const url = `${API_BASE_URL}/bookings?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }
  const data: BookingListResponse = await res.json();
  return data;
};

export const updateBookingPaymentStatus = async (
  id: number,
  paymentStatus: number
) => {
  const url = `${API_BASE_URL}/bookings/${id}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentStatus }),
  });
  if (!res.ok) {
    throw new Error("Failed to update booking payment status");
  }
  const data: Booking = await res.json();
  return data;
};


