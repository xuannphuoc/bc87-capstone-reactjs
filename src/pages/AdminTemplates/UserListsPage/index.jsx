import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "./slice";

export default function UserListsPage() {
  const dispatch = useDispatch();
  const userListState = useSelector((state) => state.userList);

  // fallback từng giá trị để tránh warning
  const list = userListState?.list ?? [];
  const loading = userListState?.loading ?? false;
  const error = userListState?.error ?? null;

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  const filteredList =
    search.trim() === ""
      ? list
      : list.filter(
          (user) =>
            user.taiKhoan?.toLowerCase().includes(search.toLowerCase()) ||
            user.hoTen?.toLowerCase().includes(search.toLowerCase())
        );

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Danh sách Người Dùng</h2>

      {loading && <div className="alert alert-info">Đang tải dữ liệu...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm theo tài khoản hoặc họ tên..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Tài khoản</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Loại</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.length > 0 ? (
              paginatedList.map((user, index) => (
                <tr key={user.taiKhoan + index}>
                  <td style={{ color: "white" }}>{user.taiKhoan}</td>
                  <td style={{ color: "white" }}>{user.hoTen}</td>
                  <td style={{ color: "white" }}>{user.email}</td>
                  <td style={{ color: "white" }}>{user.soDt}</td>
                  <td style={{ color: "white" }}>{user.maLoaiNguoiDung}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
