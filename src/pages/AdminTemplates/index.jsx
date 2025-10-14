import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./_components/Navbar";
import "../../assets/catalog.css";

export default function AdminTemplate() {
  const data = useSelector((state) => state.authReducer.data);

  if (!data) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Navbar />
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
