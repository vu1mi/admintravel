export default function PaymentInfo({ info }: any) {
  return (
    <div className="text-sm">
      <div>Tổng tiền: {info.total}</div>
      <div>Giảm: {info.discount}</div>
      <div>Mã giảm: {info.code}</div>
      <div>Thanh toán: {info.final}</div>
      <div>PTTT: {info.method}</div>
      <div>TTTT: {info.status}</div>
    </div>
  );
}
