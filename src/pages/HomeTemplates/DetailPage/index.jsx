import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchDetailMovie} from "./slice.js";

export default function DetailPage() {
    const movieState = useSelector((state)=>state.detailMovieReducer);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(fetchDetailMovie(id));
    }, [id])
  return (
    <div>
      <h1>DetailPage</h1>
    </div>
  );
}
