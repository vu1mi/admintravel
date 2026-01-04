"use client";
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function MembersPage() {
    const [showform, setShowForm] = useState(false);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Members Page</h1>
      <div className='flex justify-between mt-20'>
        <div className="border border-gray-400  p-2 rounded-xl inline-block max-w-[300px] w-full">
            <Search className="inline-block mr-2" />
            <input type="text " placeholder="Tìm kiếm"  />
        </div>
        <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-3" onClick={()=>{setShowForm(true)}}>Thêm thành viên</button>
        </div>
      </div >
         <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-10 ">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3"></th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Hành động</th>
                </tr>
              </thead>
      
              <tbody>
                {/* {datavoucher?.map((item, i) => (
                  <MemberItem key={i} {...item} setRerender={setRerender} />
                ))} */}
              </tbody>
            </table>
          </div>
    </div>
  );
}