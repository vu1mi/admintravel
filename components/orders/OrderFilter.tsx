"use client";

import { FiFilter, FiRefreshCcw } from "react-icons/fi";
import {
  FaFilter,
  FaRotateLeft,
  FaMagnifyingGlass,
  FaPenToSquare,
  FaTrashCan,
} from "react-icons/fa6";

export default function OrderFilter() {
  return (
   <div className="section-4">
           <div className="inner-wrap">
             <div className="inner-item inner-label">
               <FaFilter /> Bộ lọc
             </div>
   
             <div className="inner-item">
               <select
                 value={"Trạng thái"}
               >
                 <option value="">Trạng thái</option>
                 <option value="active">Hoạt động</option>
                 <option value="inactive">Tạm dừng</option>
               </select>
             </div>
   
             <div className="inner-item">
               <select>
                 <option value="">Người tạo</option>
                 <option value="">Lê Văn A</option>
                 <option value="">Lê Văn B</option>
               </select>
             </div>
   
             <div className="inner-item">
               <input type="date" />
               <span>-</span>
               <input type="date" />
             </div>
   
             <div className="inner-item">
               <select
                 value={"Danh mục"}
               >
                 <option value="">Danh mục</option>
                 <option value="1">Danh mục 1</option>
                 <option value="2">Danh mục 2</option>
               </select>
             </div>
   
             <div className="inner-item">
               <select
                 value={"Mức giá"}
               >
                 <option value="">Mức giá</option>
                 <option value="under2m">Dưới 2tr</option>
                 <option value="2m-4m">Từ 2tr đến 4tr</option>
                 <option value="4m-6m">Từ 4tr đến 6tr</option>
                 <option value="above6m">Trên 6tr</option>
               </select>
             </div>
   
             <div className="inner-item inner-reset">
               <FaRotateLeft /> Xóa bộ lọc
             </div>
           </div>
         </div>
  );
}
