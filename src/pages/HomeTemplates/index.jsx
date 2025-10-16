import Header from "./partials/Header/index.jsx";
import Loader from "./partials/Loader/index.jsx";
import {Outlet} from "react-router-dom";
import Movie from "./HomePage/partials/Movie/index.jsx";
import Footer from "./partials/Footer/index.jsx";

export default function HomeTemplates() {
  return (
      <div>
          <Loader/>
          <Header/>
          <Outlet/>
          <Movie/>
          <Footer/>
      </div>
  );
}
