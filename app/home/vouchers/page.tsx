"use client";
import {useEffect, useState} from "react";
import {getVouchers,VoucherDetail} from "../../api/voucherapi";
import { FiTrash2 } from "react-icons/fi";
import checkVoucher from "../../utils/checkvoucher";

const VoucherItem = ({ code ,discountValue ,validTo,discountType, setRerender}: { code: string; discountValue: number; validTo: any; discountType: string; setRerender: (rerender: boolean) => void }) => {
  const  deletvoucher = async () => {
    console.log("delete voucher",code)
  }
    return (<tr className="border-b">
          <td className="p-3">
            <input type="checkbox" />
          </td>
    
          <td className="p-3 text-center">{code}</td>

          <td className="p-3 text-center">{checkVoucher(discountType, discountValue)}</td>

          <td className="p-3 flex justify-center">
             <button
                onClick={deletvoucher}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-red-100 text-red-500 hover:bg-red-50"
                // aria-label={`Xóa ${user?.name}`}
              >
                <FiTrash2 />
              </button>
          </td>
        </tr>)
}

export default function VoucherPage() {
    const [datavoucher , setDataVoucher] = useState<VoucherDetail[]>()
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const vouchers: VoucherDetail[] = await getVouchers();
                console.log("Vouchers:", vouchers);
                setDataVoucher(vouchers);

            } catch (error) {
                console.error("Error fetching vouchers:", error);
            }
        };
        fetchVouchers();
    }, [rerender]);
    console.log("data voucher",datavoucher)
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Voucher</h1>
       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3"></th>
                  <th className="p-3">CodeVoucher</th>
                  <th className="p-3">Giá trị</th>
                  <th className="p-3">Hành động</th>
                </tr>
              </thead>
      
              <tbody>
                {datavoucher?.map((item, i) => (
                  <VoucherItem key={i} {...item} setRerender={setRerender} />
                ))}
              </tbody>
            </table>
          </div>
    </div>
  );
}