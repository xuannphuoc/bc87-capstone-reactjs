import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createShowtime,
  getTheaterSystems,
  getTheaterClusters,
  resetState,
} from "./slice";
import { fetchMovies } from "./../CatalogPage/slice";

export default function ShowtimePage() {
  const { maPhim } = useParams();
  const dispatch = useDispatch();

  // Lấy danh sách phim từ Redux
  const movieState = useSelector((state) => state.movie);
  const { list: movieList = [], loading: movieLoading } = movieState || {};

  const showtimeState = useSelector((state) => state.showtime);
  const {
    loading,
    error,
    success,
    theaterSystems = [],
    theaterClusters = [],
  } = showtimeState || {};

  const [form, setForm] = useState({
    maRap: "",
    maCumRap: "",
    ngayChieuGioChieu: "",
    giaVe: "",
  });

  // Fetch movie list khi mount
  useEffect(() => {
    if (!movieList.length) {
      dispatch(fetchMovies());
    }
  }, [dispatch, movieList.length]);

  // Reset showtime state khi unmount
  useEffect(() => {
    return () => dispatch(resetState());
  }, [dispatch]);

  // Alert khi success/error
  useEffect(() => {
    if (success) {
      alert("Tạo lịch chiếu thành công!");
      setForm({ maRap: "", maCumRap: "", ngayChieuGioChieu: "", giaVe: "" });
    }
    if (error) {
      alert("Lỗi tạo lịch chiếu: " + JSON.stringify(error));
    }
  }, [success, error]);

  if (movieLoading)
    return <div className="container my-5">Đang tải phim...</div>;

  // 🔹 Thêm kiểm tra để tránh lỗi .find undefined
  if (!Array.isArray(movieList)) {
    console.warn("movieList không phải là mảng:", movieList);
    return <div className="container my-5">Lỗi dữ liệu phim!</div>;
  }

  // Tìm phim theo maPhim (so sánh linh hoạt ==)
  const phim = movieList.find((p) => p.maPhim == maPhim);

  if (!phim) {
    console.log(
      "Không tìm thấy phim với maPhim:",
      maPhim,
      "Danh sách phim:",
      movieList
    );
    return (
      <div className="container my-5">
        Phim không tồn tại hoặc chưa load xong!
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "maRap") {
      setForm((prev) => ({ ...prev, maCumRap: "" }));
      dispatch(getTheaterClusters(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("maPhim:", maPhim);
    console.log(
      "Danh sách phim hiện có:",
      movieList?.map((p) => p.maPhim)
    );

    // Kiểm tra thông tin form
    if (
      !form.maRap ||
      !form.maCumRap ||
      !form.ngayChieuGioChieu ||
      !form.giaVe
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const formatDateTime = (dateString) => {
      const date = new Date(dateString);
      const dd = String(date.getDate()).padStart(2, "0");
      const MM = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      const hh = String(date.getHours()).padStart(2, "0");
      const mm = String(date.getMinutes()).padStart(2, "0");
      const ss = String(date.getSeconds()).padStart(2, "0");
      return `${dd}/${MM}/${yyyy} ${hh}:${mm}:${ss}`;
    };

    const phim = movieList?.find((p) => p.maPhim === Number(maPhim));

    if (!phim) {
      alert(`Phim không tồn tại hoặc chưa load xong!`);
      console.error("Không tìm thấy phim với maPhim:", maPhim);
      return;
    }

    const formattedDate = formatDateTime(form.ngayChieuGioChieu);

    const payload = {
      maPhim: phim.maPhim,
      maRap: form.maCumRap,
      ngayChieuGioChieu: formattedDate,
      giaVe: Number(form.giaVe),
    };

    console.log("Payload gửi API:", payload);
    dispatch(createShowtime(payload));
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4 border-0 rounded-4">
        <h3 className="mb-4 text-center text-black fw-bold">
          🎬 Tạo lịch chiếu cho phim: {phim.tenPhim}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Ngày chiếu */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-black">
              Ngày / giờ chiếu
            </label>
            <input
              type="datetime-local"
              name="ngayChieuGioChieu"
              className="form-control shadow-sm"
              value={form.ngayChieuGioChieu}
              onChange={handleChange}
              required
            />
          </div>

          {/* Hệ thống rạp */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-black">
              Hệ thống rạp
            </label>
            <select
              name="maRap"
              className="form-select shadow-sm"
              value={form.maRap}
              onChange={handleChange}
              onFocus={() => dispatch(getTheaterSystems())}
              required
            >
              <option value="">Chọn hệ thống rạp</option>
              {theaterSystems.map((system) => (
                <option key={system.maHeThongRap} value={system.maHeThongRap}>
                  {system.tenHeThongRap}
                </option>
              ))}
            </select>
          </div>

          {/* Cụm rạp */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-black">Cụm rạp</label>
            <select
              name="maCumRap"
              className="form-select shadow-sm"
              value={form.maCumRap}
              onChange={handleChange}
              disabled={!form.maRap}
              required
            >
              <option value="">Chọn cụm rạp</option>
              {theaterClusters.map((cluster) => (
                <option key={cluster.maCumRap} value={cluster.maCumRap}>
                  {cluster.tenCumRap}
                </option>
              ))}
            </select>
          </div>

          {/* Giá vé */}
          <div className="mb-4">
            <label className="form-label fw-semibold text-black">Giá vé</label>
            <input
              type="number"
              name="giaVe"
              className="form-control shadow-sm"
              value={form.giaVe}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold py-2 shadow-sm"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Đang tạo lịch chiếu...
              </>
            ) : (
              "Tạo lịch chiếu"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
