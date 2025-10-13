import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./slice";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/slimselect.css";
import "../../../assets/css/admin.css";
import "../../../../public/webfont/tabler-icons.min.css";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data, error } = useSelector(
    (state) => state.registerReducer
  );

  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    hoTen: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = () => {
    const payload = {
      ...form,
      maNhom: "GP01",
      hoTen: form.taiKhoan,
    };
    dispatch(registerUser(payload));
  };

  useEffect(() => {
    if (data) {
      alert("Đăng ký thành công!");
      navigate("/auth");
    }
  }, [data, navigate]);

  return (
    <div
      className="sign section--bg"
      data-bg="img/section/section.jpg"
      style={{ backgroundImage: "url('/img-admin/section/section.jpg')" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              {/* registration form */}
              <form
                className="sign__form"
                onSubmit={(e) => e.preventDefault()}
                autoComplete="off"
              >
                <a href="/" className="sign__logo">
                  <img src="/img-admin/logo.svg" alt="logo" />
                </a>

                <div className="sign__group">
                  <input
                    name="taiKhoan"
                    onChange={handleOnChange}
                    type="text"
                    className="sign__input"
                    placeholder="Name"
                  />
                </div>

                <div className="sign__group">
                  <input
                    name="email"
                    onChange={handleOnChange}
                    type="text"
                    className="sign__input"
                    placeholder="Email"
                  />
                </div>

                <div className="sign__group">
                  <input
                    name="matKhau"
                    onChange={handleOnChange}
                    type="password"
                    className="sign__input"
                    placeholder="Password"
                  />
                </div>

                <div className="sign__group">
                  <input
                    name="soDt"
                    onChange={handleOnChange}
                    type="text"
                    className="sign__input"
                    placeholder="Phone"
                  />
                </div>

                <div className="sign__group sign__group--checkbox">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    defaultChecked
                  />
                  <label htmlFor="remember">
                    I agree to the <a href="#">Privacy Policy</a>
                  </label>
                </div>

                <button
                  className="sign__btn"
                  type="button"
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Sign up"}
                </button>

                {error && (
                  <p className="text-danger text-center mt-3">
                    {error?.response?.data?.content || "Đăng ký thất bại!"}
                  </p>
                )}

                <span className="sign__delimiter">or</span>

                <div className="sign__social">
                  <a className="fb" href="#">
                    Sign up with <i className="ti ti-brand-facebook" />
                  </a>
                  <a className="tw" href="#">
                    Sign up with <i className="ti ti-brand-x" />
                  </a>
                  <a className="gl" href="#">
                    Sign up with <i className="ti ti-brand-google" />
                  </a>
                </div>

                <span className="sign__text">
                  Already have an account? <Link to="/auth">Sign in!</Link>
                </span>
              </form>
              {/* registration form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
