const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8088/api/contacts";

export type DateTuple = [number, number, number, number, number, number];

export interface EmailItem {
  createdBy: string;
  updatedBy: string;
  id: number;
  email: string;
  created_at: DateTuple;
  updated_at: DateTuple;
}

export interface EmailResponse {
  data: EmailItem[];
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number;
}

export const getContact = async (): Promise<EmailResponse> => {
  const res = await fetch(`${API_BASE_URL}`);

  if (!res.ok) {
    throw new Error("Failed to get contact!");
  }

  const data: EmailResponse = await res.json();
  return data;
};
