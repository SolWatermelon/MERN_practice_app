import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

// import Navbar from "./components/Navbar"
// import
import Home from "./routes/Home"
import About from "./routes/About"
import SignIn from "./routes/SignIn"
import SignUp from "./routes/SignUp"
import Profile from "./routes/Profile"
import MainLayouts from './layouts/MainLayouts';



const router = createBrowserRouter([
  {
    element: <MainLayouts/>,
    children: [
      {
        path: "/",
        element:  <Home/>
      },
      {
        path: "/about",
        // element: <PostListPage />,
        element: <About/>
      },
      {
        path: "/sing-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/profile",
        element: <Profile />,
      }
    ],
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
)
