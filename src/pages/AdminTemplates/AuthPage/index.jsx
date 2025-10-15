import { useState } from "react";
import { authenLogin } from "./slice";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/slimselect.css";
import "../../../assets/css/admin.css";
import "../../../../public/webfont/tabler-icons.min.css";

export default function AuthPage() {
  const error = useSelector((state) => state.authReducer.error);
  const data = useSelector((state) => state.authReducer.data);

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  if (data) {
    // Redict to dashboard
    return <Navigate to={"/admin/catalog"} />;
  }

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authenLogin(user));
  };

  return (
    <>
      <div
        className="sign section--bg bg-center bg-cover bg-no-repeat"
        data-bg="/img-admin/section/section.jpg"
        style={{ backgroundImage: "url('/img-admin/section/section.jpg')" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sign__content">
                {/* authorization form */}
                <form onSubmit={handleSubmit} action="#" className="sign__form">
                  <a href="index.html" className="sign__logo">
                    <img src="/img-admin/logo.svg" alt="logo" />
                  </a>
                  <div className="sign__group">
                    <input
                      onChange={handleOnChange}
                      name="taiKhoan"
                      type="text"
                      className="sign__input"
                      placeholder="Email"
                    />
                  </div>
                  <div className="sign__group">
                    <input
                      onChange={handleOnChange}
                      name="matKhau"
                      type="password"
                      className="sign__input"
                      placeholder="Password"
                    />
                  </div>
                  <div className="sign__group sign__group--checkbox">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      defaultChecked="checked"
                    />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                  <button className="sign__btn" type="submit">
                    Sign in
                  </button>
                  {error && (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {error.response.data.content}
                    </div>
                  )}
                  <span className="sign__delimiter">or</span>
                  <div className="sign__social">
                    <a className="fb" href="#">
                      Sign in with
                      <i className="ti ti-brand-facebook" />
                    </a>
                    <a className="tw" href="#">
                      Sign in with
                      <i className="ti ti-brand-x" />
                    </a>
                    <a className="gl" href="#">
                      Sign in with
                      <i className="ti ti-brand-google" />
                    </a>
                  </div>
                  <span className="sign__text">
                    Don't have an account?{" "}
                    <Link to="/register">Sign up!</Link>
                  </span>
                  <span className="sign__text">
                    <a href="forgot.html">Forgot password?</a>
                  </span>
                </form>
                {/* end authorization form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
