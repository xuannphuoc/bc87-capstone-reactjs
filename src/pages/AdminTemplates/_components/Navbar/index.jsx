import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./../../AuthPage/slice";
import { useState } from "react";
import "./../../../../assets/userbar.css"

export default function Userbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.authReducer.data);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <>
      <div className="sidebar__user">
        <div className="sidebar__user-img">
          <img src="./img-admin/user.svg" alt="user" />
        </div>

        <div className="sidebar__user-title">
          <span>Admin</span>
          <p>{data?.email || "John Doe"}</p>
        </div>

        <button
          className="sidebar__user-btn"
          type="button"
          onClick={handleLogout}
        >
          <i className="ti ti-logout"></i>
        </button>
      </div>

      <div className="sidebar__nav-wrap">
        <ul className="sidebar__nav">
          <li className="sidebar__nav-item">
            <Link
              to="/admin/catalog"
              className="sidebar__nav-link sidebar__nav-link--active"
            >
              <i className="ti ti-movie"></i> <span>Catalog</span>
            </Link>
          </li>

          {/* Dropdown Users */}
          <li
            className={`sidebar__nav-item ${
              openUserDropdown ? "sidebar__nav-item--open" : ""
            }`}
          >
            <button
              type="button"
              className="sidebar__nav-link"
              onClick={() => setOpenUserDropdown(!openUserDropdown)}
            >
              <i className="ti ti-users"></i> <span>Users</span>
              <i
                className={`ti ti-chevron-down ${
                  openUserDropdown ? "rotate" : ""
                }`}
                style={{ marginLeft: "auto" }}
              ></i>
            </button>

            {openUserDropdown && (
              <ul className="sidebar__dropdown-menu">
                <li>
                  <Link to="add">Thêm người dùng</Link>
                </li>
                <li>
                  <Link to="user-list">Danh sách người dùng</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
