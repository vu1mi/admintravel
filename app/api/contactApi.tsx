const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8088/api/contacts";

export type DateTuple = [number, number, number, number, number, number];

// export interface EmailItem {
//   createdBy: string;
//   updatedBy: string;
//   id: number;
//   email: string;
//   created_at: DateTuple;
//   updated_at: DateTuple;
// }

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

//  xoa contact 
export const deleteContact = async (id: number): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete contact!");
  } 
};

//  them contact
export const addContact = async (email: string): Promise<any> => {
  const res = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    throw new Error("Failed to add contact!");
  }
  const data:any = await res.json();
  return data;
}