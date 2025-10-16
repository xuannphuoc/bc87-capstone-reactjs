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
                                <a href="#0">movies</a>
                                <ul className="submenu">
                                    <li>
                                        <a href="movie-grid.html">Movie Grid</a>
                                    </li>
                                    <li>
                                        <a href="movie-list.html">Movie List</a>
                                    </li>
                                    <li>
                                        <a href="movie-details.html">Movie Details</a>
                                    </li>
                                    <li>
                                        <a href="movie-details-2.html">Movie Details 2</a>
                                    </li>
                                    <li>
                                        <a href="movie-ticket-plan.html">Movie Ticket Plan</a>
                                    </li>
                                    <li>
                                        <a href="movie-seat-plan.html">Movie Seat Plan</a>
                                    </li>
                                    <li>
                                        <a href="movie-checkout.html">Movie Checkout</a>
                                    </li>
                                    <li>
                                        <a href="popcorn.html">Movie Food</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#0">blog</a>
                                <ul className="submenu">
                                    <li>
                                        <a href="blog.html">Blog</a>
                                    </li>
                                    <li>
                                        <a href="blog-details.html">Blog Single</a>
                                    </li>
                                </ul>
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