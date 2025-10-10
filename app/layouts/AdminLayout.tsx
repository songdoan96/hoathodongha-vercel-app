import React from "react";
import { Link, Outlet } from "react-router";

function AdminLayout() {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/6 p-4 fixed top-0 left-0">
        <div className="flex flex-col">
          <Link to="/admin/quote">Lời hay</Link>
        </div>
      </div>
      <div className="flex-1 absolute p-4 top-0 left-1/6 border-l">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
