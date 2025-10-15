import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, addMovie, updateMovie, deleteMovie } from "./slice";
import MovieFormModal from "./modal";
import { useNavigate } from "react-router-dom";

export default function CatalogPage() {
  const dispatch = useDispatch();

  const movieState = useSelector((state) => state.movie || state.movieReducer);

  const { list = [], loading = false, error = null } = movieState || {};

  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  const handleCreateShowtime = (maPhim) => {
    navigate(`/admin/showtime/${maPhim}`);
  };

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const filtered = list.filter((m) => {
    if (!search) return true;
    const s = search.toString().toLowerCase();
    return (
      String(m.maPhim).toLowerCase().includes(s) ||
      (m.tenPhim || "").toLowerCase().includes(s)
    );
  });

  const openAdd = () => {
    setEditing(null);
    setModalVisible(true);
  };

  const openEdit = (movie) => {
    setEditing(movie);
    setModalVisible(true);
  };

  const handleModalSubmit = (formData, isEdit) => {
    if (isEdit) {
      dispatch(updateMovie(formData));
    } else {
      dispatch(addMovie(formData));
    }
    setModalVisible(false);
  };

  const handleDelete = (maPhim) => {
    if (window.confirm("Bạn có chắc muốn xóa phim này?")) {
      dispatch(deleteMovie(maPhim));
    }
  };

  return (
    <div className="catalog-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Quản lý phim</h3>
        <div className="d-flex gap-2 align-items-center">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo tên hoặc mã phim"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" onClick={() => {}}>
              Tìm
            </button>
          </div>

          <button className="btn btn-success" onClick={openAdd}>
            Thêm phim mới
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-primary">
              <tr>
                <th>Mã phim</th>
                <th>Hình ảnh</th>
                <th>Tên phim</th>
                <th>Bí danh</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Đang tải...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                filtered.map((movie) => (
                  <tr key={movie.maPhim}>
                    <td>{movie.maPhim}</td>
                    <td style={{ width: 80 }}>
                      <img
                        src={movie.hinhAnh}
                        alt={movie.tenPhim}
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    </td>
                    <td>{movie.tenPhim}</td>
                    <td>{movie.biDanh}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => openEdit(movie)}
                      >
                        <i className="bi bi-pencil-square" />{" "}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger me-2"
                        onClick={() => handleDelete(movie.maPhim)}
                      >
                        <i className="bi bi-trash" />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-success me-2"
                        variant="outline-success"
                        title="Tạo lịch chiếu"
                        onClick={() => handleCreateShowtime(movie.maPhim)}
                      >
                        <i className="bi bi-calendar"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <MovieFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleModalSubmit}
        initial={editing}
      />
    </div>
  );
}
