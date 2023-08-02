import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Single_News from './pages/Single_News/Single_News';
import Single_Page from './pages/Single_Page/Single_Page';
import Write_News from './pages/Write_News/Write_News';
import Write_Page from './pages/Write_Page/Write_Page';
import Admin from './pages/Admin/Admin';
import News_Page from "./pages/News_Page/News_Page";
import Unauthorized_401 from './pages/Error/Unauthorized_401';
import NotFoundPage_404 from './pages/Error/NotFoundPage_404';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Navbar_Edit from "./pages/Admin/Navbar_Edit/Navbar_Edit";
import User_Edit from "./pages/Admin/User_Edit/User_Edit";
import Homepage_Menu from "./pages/Admin/Homepage_Menu/Homepage_Menu";
import Sidebar_Menu from "./pages/Admin/Sidebar_Menu/Sidebar_Menu";
import Sponsor_Edit from "./pages/Admin/Sponsor_Edit/Sponsor_Edit";
import Sponsor from "./pages/Sponsor/Sponsor";
import Homepage_Pic from "../src/pages/Admin/Homepage_Pic/Homepage_Pic";

const Layout = () =>{
  return (
    <>
    <div className="bg-gray-100">
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
        element:<Home/>,
      },
      {
        path:"/contact",
        element:<Contact/>,
      },
      {
        path:"/nyheter/:id",
        element:<Single_News/>,
      },
      {
        path:"/side/:id",
        element:<Single_Page/>,
      },
      {
        path:"/write_news",
        element:<Write_News/>,
      },
      {
        path:"/write_page",
        element:<Write_Page/>,
      },
      {
        path:"/admin",
        element:<Admin/>,
      },
      {
        path:"/news",
        element:<News_Page/>,
      },
      {
        path:"/Unauthorized_401",
        element:<Unauthorized_401/>,
      },
      {
        path: '*',
        element: <NotFoundPage_404 />,
      },
      {
        path: "/navbar_edit",
        element:<Navbar_Edit />
      },
      {
        path: "/user_edit",
        element: <User_Edit />
      },
      {
        path: "/homepagemenu_edit",
        element: <Homepage_Menu />
      },
      {
        path: "/sidebarmenu_edit",
        element: <Sidebar_Menu />
      },
      {
        path: "/sponsor_edit",
        element: <Sponsor_Edit />
      },
      {
        path: "/sponsorer",
        element: <Sponsor />
      },
      {
        path: "/homepagepic_edit",
        element: <Homepage_Pic />
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}



export default App;
