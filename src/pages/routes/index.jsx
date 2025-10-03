import HomeTemplate from "../pages/HomeTemplates";
import HomePage from "../pages/HomeTemplates/HomePage";
import AuthPage from "../pages/AdminTemplates/AuthPage";
import AdminTemplate from "../pages/AdminTemplates";
import AboutPage from "../pages/HomeTemplates/AboutPage";
import ListMoviePage from "../pages/HomeTemplates/ListMoviePage";
import DetailPage from "../pages/HomeTemplates/DetailPage";
import DashboardPage from "../pages/AdminTemplates/DashboardPage";
import AddUserPage from "../pages/AdminTemplates/AddUserPage";
import { Route } from "react-router-dom";

const routes = [
  {
    path: "",
    element: HomeTemplate,
    nested: [
      { path: "", element: HomePage },
      { path: "about", element: AboutPage },
      { path: "list-movie", element: ListMoviePage },
      { path: "detail/:id", element: DetailPage, hiddenNav: false },
    ],
  },
  {
    path: "",
    element: HomeTemplate,
    nested: [{ path: "", element: HomePage }],
  },
  {
    path: "",
    element: AdminTemplate,
    nested: [
      { path: "dashboard", element: DashboardPage },
      { path: "add-user", element: AddUserPage },
    ],
  },
  {
    path: "",
    element: AuthPage,
  },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route path={route.path} element={<route.element />}>
          {route.nested.map((item) => (
            <Route path={item.path} element={<item.element />} />
          ))}
        </Route>
      );
    } else {
      return <Route path={route.path} element={<route.element />} />;
    }
  });
};
