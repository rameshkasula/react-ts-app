import { appRouter } from "./appRouter";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
export default function App() {
  return <RouterProvider router={appRouter} />;
}
