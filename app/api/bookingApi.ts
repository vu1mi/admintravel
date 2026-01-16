const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8088/api";

// Handle API response errors
const handleResponse = async (res: Response) => {
  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Unauthorized");
  }
  if (res.status === 403) {
    if (typeof window !== "undefined") {
      window.location.href = "/not-found";
    }
    throw new Error("Forbidden");
  }
  if (!res.ok) {
    throw new Error("API request failed");
  }
  return res;
};

export interface BookingItem {
  id: number;
  tourId: number;
  tourName: string;
  tourImage: string;
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
  created_at?: number[];
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
  dateTo?: string | undefined,
  bookingStatus?: number | undefined
) => {
  const params = new URLSearchParams();
  params.set("offset", String(offset));
  params.set("limit", String(limit));
  if (paymentStatus !== undefined)
    params.set("paymentStatus", String(paymentStatus));
  if (bookingStatus !== undefined) params.set("status", String(bookingStatus));
  if (name) params.set("keyword", name);
  if (dateFrom) params.set("startDate", dateFrom);
  if (dateTo) params.set("endDate", dateTo);

  const url = `${API_BASE_URL}/bookings/search?${params.toString()}`;
  const res = await fetch(url, {
    credentials: "include",
  });
  await handleResponse(res);
  const data: BookingListResponse = await res.json();
  return data;
};

export const updateBookingPaymentStatus = async (
  id: number,
  paymentStatus: number
) => {
  const url = `${API_BASE_URL}/bookings/${id}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ paymentStatus }),
  });
  await handleResponse(res);
  const data: Booking = await res.json();
  return data;
};
