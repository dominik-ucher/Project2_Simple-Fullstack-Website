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
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const Layout = () =>{
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
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
