// import { Plus } from "lucide-react";
// import { useNavigate } from "react-router";
// import { checkRole } from "../lib/utils";
// import {
//   Button,
//   Menubar,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarSeparator,
//   MenubarSub,
//   MenubarSubContent,
//   MenubarSubTrigger,
//   MenubarTrigger,
// } from "./ui";

// function MenubarComponent() {
//   const navigate = useNavigate();
//   return (
//     <Menubar className="text-black">
//       <MenubarMenu>
//         <MenubarTrigger>
//           <Plus color="blue" className="rounded-full h-9 w-9 z-50 bg-white hover:bg-white/90" />
//         </MenubarTrigger>
//         <MenubarContent>
//           <MenubarSub>
//             <MenubarSubTrigger>Nghỉ phép</MenubarSubTrigger>
//             <MenubarSubContent>
//               <MenubarItem onClick={() => navigate(formRouter.index)}>Tạo đơn</MenubarItem>
//               <MenubarItem onClick={() => navigate(formRouter.kynhan)}>Ký đơn</MenubarItem>
//             </MenubarSubContent>
//           </MenubarSub>
//           <MenubarSeparator />
//           <MenubarSub>
//             <MenubarSubTrigger>Tăng ca</MenubarSubTrigger>
//             <MenubarSubContent>
//               <MenubarItem onClick={() => navigate(lineRouter.overtime.taodon)}>
//                 Tạo đơn
//               </MenubarItem>
//               <MenubarItem onClick={() => navigate(lineRouter.overtime.index)}>Xem đơn</MenubarItem>
//             </MenubarSubContent>
//           </MenubarSub>
//         </MenubarContent>
//       </MenubarMenu>
//     </Menubar>
//   );
// }

// export default MenubarComponent;
