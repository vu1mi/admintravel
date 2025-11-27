import ContactFilter from "@/components/contact/ContactFilter";
import ContactAction from "@/components/contact/ContactAction";
import ContactTable from "@/components/contact/ContactTable";
import ContactPagination from "@/components/contact/ContactPagination";

export default function ContactPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Thông tin liên hệ</h1>

      <ContactFilter />
      <ContactAction />
      <ContactTable />
      <ContactPagination />
    </div>
  );
}
