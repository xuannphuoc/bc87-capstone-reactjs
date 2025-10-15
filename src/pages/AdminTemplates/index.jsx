import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./_components/Navbar";
import "../../assets/catalog.css";

import SidebarUser from "./_components/Navbar/index";

export default function AdminTemplate() {
  const data = useSelector((state) => state.authReducer.data);

  if (!data) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <div className="admin-layout flex min-h-screen bg-black">
      {/* Sidebar bên trái */}
      <aside className="admin-sidebar w-64 bg-black border-r shadow-sm flex flex-col">
        <SidebarUser />
      </aside>

      {/* Khu vực nội dung */}
      <main className="admin-content flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
