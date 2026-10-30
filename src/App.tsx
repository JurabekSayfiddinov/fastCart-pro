import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layout/Layout";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AllProducts from "./pages/AllProducts";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contacts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
  path: "products",
  element: <AllProducts />,
},
 {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
  path: "cart",
  element: <Cart />,
},
{
  path: "product/:id",
  element: <ProductDetails />,
},
{
  path: "about",
  element: <About />,
},
{
  path: "contact",
  element: <Contact />,
},
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}