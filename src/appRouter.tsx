import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MEditor from "./pages/MEditor";
import Home from "./pages/Home";
import RequireAuth from "./utils/RequireAuth";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/editor",
    element: (
      <RequireAuth>
        <MEditor />
      </RequireAuth>
    ),
  },
]);
