import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import { createContext, useEffect, useState } from "react";
import Nav from './components/navigative';
// import "bootstrap-icons/font/bootstrap-icons.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, Link ,useParams  } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/login/register';
import Home from './components/Home/home';
import Equipment from './components/Equirement/equipment';
import Footer from './components/footer';
import Notfound from './components/notfound';
import Products from './components/Equirement/products';
import Booking from './components/Booking/booking';
import Cart from './components/Carts/carts';
import Admin from './components/Admin/Admin';
import { CookiesProvider,useCookies } from 'react-cookie';
import Profile from './components/Profile/profile';
const listImage = [
  {
    url: "https://d2ub1k1pknil0e.cloudfront.net/media/images/camera-photography.2e16d0ba.fill-1200x630.format-jpeg.jpg",
    title: "First slide",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    url: "https://d2ub1k1pknil0e.cloudfront.net/media/images/camera-photography.2e16d0ba.fill-1200x630.format-jpeg.jpg",
    title: "Secound slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    url: "https://img.freepik.com/free-photo/dark-blue-product-background_53876-92801.jpg",
    title: "Secound slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    url: "https://t3.ftcdn.net/jpg/00/35/94/44/360_F_35944424_YGSDMaCU6PCosD5W3xuH7wdUPMTpkkp8.jpg",
    title: "Secound slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
];
export const ContextUsers = createContext();
function App() {
  const [user, setUser] = useState({ loggedIn: false, listimage:listImage });
  const [cookies, setCookie] = useCookies(['auth']);
  const [toastList,setToastList] = useState([]);
  const getsession =()=>{
    if(cookies['auth']){
      setUser({ loggedIn: true });
    }else{
      setUser({ loggedIn: false });
    }
  }
  useEffect(() => {
    getsession();
  },[]);
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <ContextUsers.Provider value={{ user, setUser }}>
        <Nav ></Nav>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/equipment' element={<Equipment/>}/>
        <Route path='/equipment/:id' element={<Products />}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/booking/:id' element={<Booking/>}/>
        <Route path='/cart/' element={<Cart/>}/>
        <Route path='/Dashboard' element={<Admin/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/*' element={<Notfound/>} />
    </Routes>
    <Footer></Footer>
    </ContextUsers.Provider>
    </CookiesProvider>
  );
}

export default App;
