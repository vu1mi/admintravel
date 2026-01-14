"use client";
import ContactFilter from "@/components/contact/ContactFilter";
import ContactAction from "@/components/contact/ContactAction";
import ContactTable from "@/components/contact/ContactTable";
import ContactPagination from "@/components/contact/ContactPagination";
import { useEffect, useState } from "react";
import { getContacts, ContactListResponse, ContactFilterParams } from "@/app/api/contactApi";

export default function ContactClient() {
    const [datacontact, setDataContact] = useState<ContactListResponse | null>(null);
    const [rerender, setRerender] = useState(false);
    const [filters, setFilters] = useState<ContactFilterParams>({
      offset: 0,
      limit: 10,
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContacts(filters);
        console.log(data);
        setDataContact(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchData();
  }, [rerender, filters]);

  const handleFilterChange = (newFilters: Partial<ContactFilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, offset: 0 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, offset: page * (prev.limit || 10) }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Thông tin liên hệ</h1>
      <ContactFilter onFilterChange={handleFilterChange} />
      <ContactAction reRender={setRerender} onSearch={(keyword) => handleFilterChange({ keyword })} />
      <ContactTable data={datacontact} setRerender={setRerender} />
      <ContactPagination
        currentPage={datacontact?.current_page || 0}
        totalPages={datacontact?.total_pages || 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
