import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Profile from "./routes/Profile";
import MainLayouts from "./layouts/MainLayouts";
import { Provider } from "react-redux";
import News from "./routes/News";
// import store from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistor, store } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoute from "./components/privateRoute";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <MainLayouts />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        // element: <PostListPage />,
        element: <About />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/profile",
        element: <PrivateRoute />,
        children: [{ path: "", element: <Profile /> }],
      },
      {
        path: "/news",
        element: <News />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
