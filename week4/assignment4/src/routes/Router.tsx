import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./AppRouter";

const router = createBrowserRouter(routes);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
