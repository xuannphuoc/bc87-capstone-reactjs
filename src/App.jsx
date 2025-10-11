import { BrowserRouter, Routes } from "react-router-dom";
import { renderRoutes } from "./../src/pages/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>{renderRoutes()}</Routes>
    </BrowserRouter>
  );
}

export default App;
