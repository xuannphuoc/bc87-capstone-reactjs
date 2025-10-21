import {useDispatch, useSelector} from "react-redux";
import {movieSlice} from "./slice.js";
import {useEffect, useState} from "react";
import Loader from "../partials/Loader/index.jsx";
import MovieProps from "./movie.jsx";
export default function Movie() {

    const dispatch = useDispatch();

    const movieState = useSelector((state) =>  state.listMovieReducer)

    const {list = [], loading = false, error = null} = movieState || {};

    const [search, setSearch] = useState('');

    useEffect(() => {
            dispatch(movieSlice());
        },
        [dispatch]);

    const renderListMovie = () => {
        const {data}= movieState;
        return data?.map((item) => {
            return <MovieProps key={item.maPhim} data={item}/>
        })
    }

    const filtered = list.filter((m) => {
        if (!search) return true;
        const s = search.toString().toLowerCase();
        return (
            String(m.maPhim).toLowerCase().includes(s) ||
            (m.tenPhim || "").toLowerCase().includes(s)
        );
    });

    if (movieState.loading) return <Loader/>;
    return (
        <div>
            <section className="search-ticket-section padding-top pt-lg-0">
                <div className="container">
                    <div className="search-tab bg_img" data-background="assets/images/ticket/ticket-bg01.jpg">
                        <div className="row align-items-center mb--20">
                            <div className="col-lg-6 mb-20">
                                <div className="search-ticket-header">
                                    <h6 className="category">welcome to Boleto </h6>
                                    <h3 className="title">what are you looking for</h3>
                                </div>
                            </div>
                        </div>
                        <div className="tab-area">
                            <div className="tab-item active">
                                <form className="ticket-search-form">
                                    <div className="form-group large">
                                        <input type="text" placeholder="Search fo Movies" value={search} onChange={(e) => setSearch(e.target.value)}/>
                                        <button type="submit"><i className="fas fa-search"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="movie-section padding-top padding-bottom text-white">
                <div className="container">
                    <div className="filter-tab tab">
                        <div className="filter-area">
                            <div className="filter-main">
                                <div className="left">
                                    <div className="item">
                                        <span className="show">Show :</span>
                                        <select className="select-bar">
                                            <option value="12">12</option>
                                            <option value="15">15</option>
                                            <option value="18">18</option>
                                            <option value="21">21</option>
                                            <option value="24">24</option>
                                            <option value="27">27</option>
                                            <option value="30">30</option>
                                        </select>
                                    </div>
                                    <div className="item">
                                        <span className="show">Sort By :</span>
                                        <select className="select-bar">
                                            <option value="showing">now showing</option>
                                            <option value="exclusive">exclusive</option>
                                            <option value="trending">trending</option>
                                            <option value="most-view">most view</option>
                                        </select>
                                    </div>
                                </div>
                                <ul className="grid-button tab-menu">
                                    <li className="active">
                                        <i className="fas fa-th"></i>
                                    </li>
                                    <li>
                                        <i className="fas fa-bars"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-area">
                            <div className="tab-item active">
                                <div className="row mb-10 justify-content-center">
                                    {renderListMovie()}
                                </div>
                            </div>
                        </div>
                        <div className="pagination-area text-center">
                            <a href="#0"><i className="fas fa-angle-double-left"></i><span>Prev</span></a>
                            <a href="#0">1</a>
                            <a href="#0">2</a>
                            <a href="#0" className="active">3</a>
                            <a href="#0">4</a>
                            <a href="#0">5</a>
                            <a href="#0"><span>Next</span><i className="fas fa-angle-double-right"></i></a>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}