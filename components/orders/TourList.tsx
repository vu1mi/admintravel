export default function TourList({ tours }: any) {
  return (
    <div className="flex flex-col gap-3">
      {tours.map((t: any, i: number) => (
        <div key={i} className="flex gap-3">
          <img
            src={t.image}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div>
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-gray-500">
              Người lớn: {t.adult}<br />
              Trẻ em: {t.child}<br />
              Em bé: {t.baby}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
