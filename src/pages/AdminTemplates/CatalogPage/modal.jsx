import React, { useEffect, useState } from "react";

export default function MovieFormModal({
  visible,
  onClose,
  onSubmit,
  initial,
}) {
  const [form, setForm] = useState({
    maPhim: 0,
    tenPhim: "",
    biDanh: "",
    trailer: "",
    moTa: "",
    maNhom: "GP01",
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnhFile: null,
  });

  useEffect(() => {
    if (visible) {
      if (initial) {
        setForm({
          maPhim: initial.maPhim ?? 0,
          tenPhim: initial.tenPhim ?? "",
          biDanh: initial.biDanh ?? "",
          trailer: initial.trailer ?? "",
          moTa: initial.moTa ?? "",
          maNhom: initial.maNhom ?? "GP01",
          ngayKhoiChieu: initial.ngayKhoiChieu
            ? initial.ngayKhoiChieu.slice(0, 10)
            : "",
          sapChieu: !!initial.sapChieu,
          dangChieu: !!initial.dangChieu,
          hot: !!initial.hot,
          danhGia: initial.danhGia ?? 0,
          hinhAnhFile: null,
        });
      } else {
        setForm({
          maPhim: 0,
          tenPhim: "",
          biDanh: "",
          trailer: "",
          moTa: "",
          maNhom: "GP01",
          ngayKhoiChieu: "",
          sapChieu: false,
          dangChieu: false,
          hot: false,
          danhGia: 0,
          hinhAnhFile: null,
        });
      }
    }
  }, [visible, initial]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, hinhAnhFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const payload = new FormData();

    const convertDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, "0");
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    if (form.maPhim) payload.append("maPhim", form.maPhim);
    payload.append("tenPhim", form.tenPhim);
    payload.append("biDanh", form.biDanh);
    payload.append("trailer", form.trailer);
    payload.append("moTa", form.moTa);
    payload.append("maNhom", form.maNhom);

    if (form.ngayKhoiChieu)
      payload.append("ngayKhoiChieu", convertDate(form.ngayKhoiChieu));

    payload.append("sapChieu", form.sapChieu);
    payload.append("dangChieu", form.dangChieu);
    payload.append("hot", form.hot);
    payload.append("danhGia", form.danhGia ?? 0);

    if (form.hinhAnhFile) {
      payload.append("File", form.hinhAnhFile);
    }

    onSubmit(payload, !!initial);
  };

  if (!visible) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content bg-black">
          <div className="modal-header">
            <h5 className="modal-title">
              {initial ? "Cập nhật phim" : "Thêm phim mới"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={submit}>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Mã phim</label>
                  <input
                    type="number"
                    className="form-control"
                    name="maPhim"
                    value={form.maPhim}
                    onChange={handleChange}
                    disabled={!!initial}
                  />
                </div>

                <div className="col-md-8">
                  <label className="form-label">Tên phim</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tenPhim"
                    value={form.tenPhim}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Trailer (URL)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="trailer"
                    value={form.trailer}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Bí danh</label>
                  <input
                    type="text"
                    className="form-control"
                    name="biDanh"
                    value={form.biDanh}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Mô tả</label>
                  <textarea
                    className="form-control"
                    name="moTa"
                    value={form.moTa}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div className="col-md-5">
                  <label className="form-label">Ngày khởi chiếu</label>
                  <input
                    type="date"
                    className="form-control"
                    name="ngayKhoiChieu"
                    value={form.ngayKhoiChieu}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Đánh giá</label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    max="10"
                    name="danhGia"
                    value={form.danhGia}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Hình ảnh</label>
                  <input
                    type="file"
                    className="form-control"
                    name="hinhAnh"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 d-flex gap-3 align-items-center">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="dangChieu"
                      checked={form.dangChieu}
                      onChange={handleChange}
                      id="dangChieu"
                    />
                    <label className="form-check-label" htmlFor="dangChieu">
                      Đang chiếu
                    </label>
                  </div>

                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="sapChieu"
                      checked={form.sapChieu}
                      onChange={handleChange}
                      id="sapChieu"
                    />
                    <label className="form-check-label" htmlFor="sapChieu">
                      Sắp chiếu
                    </label>
                  </div>

                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="hot"
                      checked={form.hot}
                      onChange={handleChange}
                      id="hot"
                    />
                    <label className="form-check-label" htmlFor="hot">
                      Hot
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Hủy
              </button>
              <button type="submit" className="btn btn-primary">
                {initial ? "Cập nhật" : "Thêm phim"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
