import {NavLink} from "react-router-dom";

export default function Header() {
    return (
            <header className="header-section">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="logo">
                            <a href="index.html">
                                <img src="../../../../../public/assets/images/logo/logo.png" alt="logo"/>
                            </a>
                        </div>
                        <ul className="menu justify-center">
                            <li>
                                <a href="#0" className="active">Home</a>
                            </li>
                            <li>
                                <NavLink to={"list-movie"}>
                                    <a href="#0">movies</a>
                                </NavLink>
                            </li>
                            <li>
                                <a href="#0">blog</a>
                            </li>
                            <li className="!pr-56">
                                <a href="contact.html">contact</a>
                            </li>
                            <li className="header-button pr-0">
                                <a href="sign-up.html">Log In</a>
                            </li>
                        </ul>
                        <div className="header-bar d-lg-none">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>
    );
}