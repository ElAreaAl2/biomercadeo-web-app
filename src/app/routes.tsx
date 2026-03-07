import { createBrowserRouter } from "react-router";
import { HomeV2 } from "./pages/v2/HomeV2";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeV2,
  },
]);
