"use client";
import ContactFilter from "@/components/contact/ContactFilter";
import ContactAction from "@/components/contact/ContactAction";
import ContactTable from "@/components/contact/ContactTable";
import ContactPagination from "@/components/contact/ContactPagination";
import { useEffect, useState } from "react";
import { getContact } from "@/app/api/contactApi";

export default function ContactClient() {
    const [datacontact , setDataContact] = useState()
  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getContact();
      console.log(data);
      setDataContact(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  fetchData();
}, []);
    console.log(datacontact)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Thông tin liên hệ</h1>
      <ContactFilter />
      <ContactAction />
      <ContactTable data={datacontact}/>
      <ContactPagination />
    </div>
  );
}
