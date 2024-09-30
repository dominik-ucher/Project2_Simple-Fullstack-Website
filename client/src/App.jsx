import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import References from "./pages/References";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home2 from "./pages/Home2"


const Layout = () =>{
  return (
    <>
    <div className="bg-gray-100">
    <ScrollToTop />
    <Navbar />
    <Outlet />
    <Footer />
    </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home2/>,
      },
      {
        path:"/about",
        element:<About/>,
      },
      {
        path:"/contact",
        element:<Contact/>,
      },
      {
        path:"/references",
        element:<References/>,
      },
      {
        path:"/home2",
        element:<Home2/>
      }
    ]
  },
  // {
  //   path: "/login",
  //   element: <Login/>,
  // },
]);

function AppRouting() {
  return (
    <RouterProvider router={router}/>
  );
}



export default AppRouting;
