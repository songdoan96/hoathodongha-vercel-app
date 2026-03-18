// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   type RowSelectionState,
// } from "@tanstack/react-table";
// import { useEffect, useState } from "react";
// import { HeaderComponent, HeaderTitle } from "~/components/Header";
// import { Checkbox } from "~/components/ui/checkbox";
// import { useEmployeesFindAll } from "~/hooks/employees-hook";
// import { linesList } from "~/lib/variables";
// import useAuthStore from "~/stores/auth-store";
// import type { EmployeeType } from "~/types/employee-type";
// const columnHelper = createColumnHelper<EmployeeType>();

// const columns = [
//   columnHelper.accessor("id", {
//     id: "id",
//     enableColumnFilter: false,
//     enableSorting: false,
//     enableHiding: false,

//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Chọn tất cả"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         className="mx-auto"
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Chọn hàng"
//         title={row.original.id.toString()}
//       />
//     ),
//   }),
//   columnHelper.display({
//     id: "index",
//     header: "STT",
//     cell: ({ row }) => row.index + 1,
//   }),
//   columnHelper.accessor("hoten", {
//     header: "Họ tên",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("msnv", {
//     header: "MSNV",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("bophan", {
//     header: "Bộ phận",
//     cell: (info) => linesList.find((line) => line.value === info.getValue())?.name,
//   }),
// ];

// function OvertimeCreate() {
//   const { user } = useAuthStore();
//   const { data: employeesData, isLoading: employeesIsLoading } = useEmployeesFindAll();
//   const [currentEmployees, setCurrentEmployees] = useState<EmployeeType[]>();
//   const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
//   useEffect(() => {
//     if (employeesData && user?.bophan) {
//       setCurrentEmployees(() =>
//         employeesData.filter((employee) => employee.bophan === user.bophan),
//       );
//     }
//   }, [employeesData]);

//   useEffect(() => {
//     if (currentEmployees) {
//       const temp: {
//         [x: string]: boolean;
//       } = {};
//       currentEmployees.forEach((employee) => {
//         temp[employee.id] = true;
//       });
//       setRowSelection(temp);
//     }
//   }, [currentEmployees]);

//   const table = useReactTable({
//     data: currentEmployees || [],
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     state: {
//       rowSelection,
//     },
//     onRowSelectionChange: setRowSelection,
//     getRowId: (row) => row.id,
//     enableRowSelection: true,
//   });
//   function handleClick() {
//     console.log(table.getSelectedRowModel().rows.map((row) => row.id));
//   }
//   return (
//     <div>
//       <HeaderComponent>
//         <HeaderTitle>PHIẾU ĐĂNG KÝ LÀM THÊM GIỜ</HeaderTitle>
//       </HeaderComponent>

//       <h1 className="text-center uppercase text-xl p-4 font-semibold">
//         Danh sách lao động đăng ký tự nguyện làm thêm giờ
//       </h1>
//       <div className="overflow-x-hidden w-full">
//         <button onClick={handleClick}>Click me</button>
//         <table className="w-full text-left border-collapse">
//           <thead>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id} className="bg-blue-500 text-white border-b border-slate-200">
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <th
//                       key={header.id}
//                       className="border font-semibold uppercase p-1 py-2 text-center"
//                     >
//                       {header.isPlaceholder ? null : (
//                         <div className="flex flex-col items-center justify-center gap-2">
//                           <div className="flex items-center gap-1">
//                             {flexRender(header.column.columnDef.header, header.getContext())}
//                           </div>
//                         </div>
//                       )}
//                     </th>
//                   );
//                 })}
//               </tr>
//             ))}
//           </thead>
//           <tbody className="divide-y divide-slate-100 text-sm">
//             {table.getRowModel().rows.map((row) => {
//               return (
//                 <tr
//                   key={row.id}
//                   className={`bg-white hover:bg-slate-50/50 group transition-colors ${row.getIsSelected() ? "selected" : null}`}
//                 >
//                   {row.getVisibleCells().map((cell) => {
//                     return (
//                       <td
//                         key={cell.id}
//                         className={`p-1 border ${cell.column.id === "hoten" ? "text-left pl-2" : "text-center"}`}
//                       >
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <input
//           type="text"
//           className="border"
//           onChange={(e) => {
//             if (!currentEmployees?.some((emp) => emp.msnv === e.target.value) && employeesData) {
//               const findEmployee = employeesData.find((emp) => emp.msnv === e.target.value);
//               if (findEmployee) {
//                 setCurrentEmployees((prev) => [...(prev || []), findEmployee]);
//               }
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default OvertimeCreate;
