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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistor, store } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoute from "./components/privateRoute";
import { ThemeProvider } from "./components/theme-provider";
import CreateListing from "./routes/CreateListing";
import ShowListings from "./routes/ShowListings";
import UpdateListing from "./routes/UpdateListing";
import Listing from "./routes/Listing";
import Search from "./routes/Search";
import toast, { Toaster } from "react-hot-toast";

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
        children: [
          { path: "", element: <Profile /> },
          {
            path: "create-listing",
            element: <CreateListing />,
          },
          {
            path: "listings",
            element: <ShowListings />,
          },
          {
            path: "update-listing/:listingId",
            element: <UpdateListing />,
          },
        ],
      },
      {
        path: "/listing/:listingId",
        element: <Listing />,
      },
      {
        path: "/search",
        element: <Search />,
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
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              // success: { iconTheme: { primary: "green", secondary: "white" } },
              style: {
                border: "2px solid #713200",
                padding: "16px",
                color: "#713200",
              },
            }}
          />
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
