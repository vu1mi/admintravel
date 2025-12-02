import type { BookingItem } from "@/app/api/bookingApi";

type TourListProps = {
  tours: BookingItem[];
};

export default function TourList({ tours }: TourListProps) {
  return (
    <div className="flex flex-col gap-3">
      {tours.map((t) => (
        <div key={t.id} className="flex gap-3">
          <div>
            <div className="font-semibold">{t.tourName}</div>
            <div className="text-sm text-gray-500">
              Người lớn: {t.adultCount} x{" "}
              {t.pricePerAdult.toLocaleString("vi-VN")}₫
              <br />
              Trẻ em: {t.childCount} x{" "}
              {t.pricePerChild.toLocaleString("vi-VN")}₫
              <br />
              Em bé: {t.infantCount} x{" "}
              {t.pricePerInfant.toLocaleString("vi-VN")}₫
              <br />
              Điểm khởi hành: {t.departureLocation}
              <br />
              Tạm tính: {t.subTotal.toLocaleString("vi-VN")}₫
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
