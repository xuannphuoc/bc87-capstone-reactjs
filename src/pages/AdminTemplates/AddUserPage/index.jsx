import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "./slice";

export default function AddUser() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(
    (state) => state.users || { list: [], loading: false, error: null }
  );

  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      await dispatch(addUser(form)).unwrap();
      setMessage({ type: "success", text: "✅ Thêm người dùng thành công!" });
      setForm({
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        email: "",
        soDt: "",
        maNhom: "GP01",
        maLoaiNguoiDung: "KhachHang",
      });
    } catch (err) {
      setMessage({ type: "error", text: err || "❌ Thêm người dùng thất bại" });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Thêm Người Dùng</h2>

      {message && (
        <div
          className={`alert ${
            message.type === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="taiKhoan"
              placeholder="Tài khoản"
              value={form.taiKhoan}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              name="matKhau"
              placeholder="Mật khẩu"
              value={form.matKhau}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="hoTen"
              placeholder="Họ tên"
              value={form.hoTen}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="soDt"
              placeholder="Số điện thoại"
              value={form.soDt}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <select
              name="maLoaiNguoiDung"
              className="form-select"
              value={form.maLoaiNguoiDung}
              onChange={handleChange}
            >
              <option value="KhachHang">Khách hàng</option>
              <option value="QuanTri">Quản trị</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Đang xử lý..." : "Thêm Người Dùng"}
        </button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}
