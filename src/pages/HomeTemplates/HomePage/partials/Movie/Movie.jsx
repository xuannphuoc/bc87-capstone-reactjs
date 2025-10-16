import {Link} from "react-router-dom";
export default function MovieProps(props) {
    const {data} = props;
    return (
        <div className="col-sm-6 col-lg-4">
            <div className="movie-grid">
                <div className="movie-thumb c-thumb">
                    <Link to={`/detail/${data.maPhim}`}

                    />
                    <a href="movie-details.html">
                        <img src={data.hinhAnh} alt={data.tenPhim}/>
                    </a>
                </div>
                <div className="movie-content bg-one">
                    <h5 className="title m-0">
                        <a href="movie-details.html">{data.tenPhim}</a>
                    </h5>
                    <ul className="movie-rating-percent">
                        <li>
                            <div className="thumb">
                                <img src="assets/images/movie/tomato.png" alt="movie"/>
                            </div>
                            <span className="content">88%</span>
                        </li>
                        <li>
                            <div className="thumb">
                                <img src="assets/images/movie/cake.png" alt="movie"/>
                            </div>
                            <span className="content">88%</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}