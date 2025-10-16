import {useSelector} from "react-redux";

export default function DetailPage() {
    const movieState = useSelector((state)=>state.detailR)
  return (
    <div>
      <h1>DetailPage</h1>
    </div>
  );
}
