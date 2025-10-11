import HomeTemplate from "./../HomeTemplates";
import HomePage from "./../HomeTemplates/HomePage";
import AuthPage from "./../AdminTemplates/AuthPage";
import AdminTemplate from "./../AdminTemplates";
import AboutPage from "./../HomeTemplates/AboutPage";
import ListMoviePage from "./../HomeTemplates/ListMoviePage";
import DetailPage from "./../HomeTemplates/DetailPage";
import DashboardPage from "./../AdminTemplates/DashboardPage";
import AddUserPage from "./../AdminTemplates/AddUserPage";
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
    path: "admin",
    element: AdminTemplate,
    nested: [
      { path: "dashboard", element: DashboardPage },
      { path: "add-user", element: AddUserPage },
    ],
  },
  {
    path: "auth",
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
