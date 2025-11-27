import TourFilter from "@/components/tours/TourFilter";
import TourAction from "@/components/tours/TourAction";
import TourTable from "@/components/tours/TourTable";
import TourPagination from "@/components/tours/TourPagination";

export default function ToursPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý tour</h1>

      <TourFilter />
      <TourAction />
      <TourTable />
      <TourPagination />
    </div>
  );
}
