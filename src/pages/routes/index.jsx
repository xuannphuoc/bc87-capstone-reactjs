import HomeTemplate from "./../HomeTemplates";
import HomePage from "./../HomeTemplates/HomePage";
import AuthPage from "./../AdminTemplates/AuthPage";
import AdminTemplate from "./../AdminTemplates";
import AboutPage from "./../HomeTemplates/AboutPage";
import ListMoviePage from "./../HomeTemplates/ListMoviePage";
import DetailPage from "./../HomeTemplates/DetailPage";
import CatalogPage from "../AdminTemplates/CatalogPage";
import RegisterPage from "../AdminTemplates/RegisterPage";
import { Route } from "react-router-dom";
import AddUserPage from "../AdminTemplates/AddUserPage";
import UserListsPage from "../AdminTemplates/UserListsPage";

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
    path: "admin",
    element: AdminTemplate,
    nested: [
      { path: "catalog", element: CatalogPage },
      { path: "add", element: AddUserPage },
      {path: "user-list", element: UserListsPage}
    ],
  },
  {
    path: "auth",
    element: AuthPage,
  },
  {
    path: "register",
    element: RegisterPage,
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
