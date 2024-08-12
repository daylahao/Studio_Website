import React, { useContext, useState, createContext, useEffect } from "react";
import SlideHeader from "../SlideHeader";
import { ContextUsers } from "../../App";
import { Col, Row, Image, Button } from "react-bootstrap";
import Itemcarts from "./Itemcarts";
import DatePicker from "react-datepicker";
import ListItemCart from "./ListItemCart";
import { Navigate } from "react-router-dom";
import { apiCarts } from "../../services/ApiCarts";
import { Cookies, useCookies } from "react-cookie";
const listImage = [
  {
    url: "http://localhost:3000/images/items/canonm50.jpg",
    title: "First slide",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    price: 100000,
  },
  {
    url: "https://d2ub1k1pknil0e.cloudfront.net/media/images/camera-photography.2e16d0ba.fill-1200x630.format-jpeg.jpg",
    title: "Secound slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
      price: 100000,
    },
  {
    url: "https://img.freepik.com/free-photo/dark-blue-product-background_53876-92801.jpg",
    title: "Secound slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
      price: 100000,
  },
  {
    url: "https://t3.ftcdn.net/jpg/00/35/94/44/360_F_35944424_YGSDMaCU6PCosD5W3xuH7wdUPMTpkkp8.jpg",
    title: "Secound slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
      price: 100000,
  },
];
export const ListContext = createContext();
function Cart(props) {
  const [totalView,setTotalView] = useState(0);
  const [cookies, setCookies] = useCookies(['user']);
  const handleDecreaseQuality = () => {};
  const handleUpdateQuality = () => {};
  const [listCards, setListCards] = useState([]);
  const [isHandleTotal, setIsHandleTotal] = useState(true);
  const [quality, setQuality] = useState(1);
  const HandleCompleteBill = () => {
    apiCarts.completeCart().then((res) => {
      if (res.status === 200) {
        let user_ = cookies['user'];
        user_.cart_id = res.data;
        setCookies('user', user_);
        // alert(cookies['user'].cart_id);
        setListCards([]);
        window.location.reload();
        // console.log(listCards)
      }
    });
  }
  const checkonlynumber = () => {};
  useEffect(() => {
    if(isHandleTotal){
    let total = 0;
    listCards.forEach((item) => {
      total += item.total;
    });
    // total = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    setTotalView(total);
    console.log(totalView);
    // setTotalView(totalView.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))
  }
  return () => {
    setIsHandleTotal(false)
  };
  })
  if(!localStorage.getItem("key")){
    return <Navigate to="/login"/>
  }
  return (
    <ListContext.Provider value={[{listCards,setListCards},{isHandleTotal,setIsHandleTotal}]}>
    <div
      className="container-xxl p-0 h-100 flex-fill d-flex flex-column text-dark"
      style={{
        color: "var(--white)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SlideHeader listImage={listImage}></SlideHeader>
      <div className="w-100">
        <h2 className="p-3 h-2">Giỏ hàng</h2>
      </div>
      <div className="w-100 m-0">
        {/* <Itemcarts></Itemcarts> */}
        <Row className="w-100 m-0">
          <Col md={8}>Sản phẩm</Col>
          <Col md={3} className="d-none d-md-block">
            Thành tiền
          </Col>
          <Col md={1} className="d-none d-md-block">
            Xóa
          </Col>
        </Row>
        <hr></hr>
        <ListItemCart></ListItemCart>
        <hr></hr>
            <Row className="d-flex flex-column justify-content-end align-items-end w-100 m-0 p-3">
                <Col xs={12} lg={6} className=" form-label h4 p-0 m-0">
                <Row className="w-100">
                    <Col xs={12} md={6}>Tổng Cộng</Col>
                    <Col xs={12}  md={6}>
                    {!isHandleTotal ? <p className="tex-center text-md-end">{totalView.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p> : <p className="tex-center text-md-end">0</p>}
                    {/* <p className="tex-center text-md-end">{totalView}</p> */}
                    </Col>
                </Row>
                <Col xs={12} variant={''} className="">
                {listCards.length > 0 ? <Button variant="success p-2 w-100" onClick={HandleCompleteBill}>Thanh toán</Button> : <Button variant="success p-2 w-100" disabled>Thanh toán</Button>}
                {/* <Button variant="success p-2 w-100" onClick={HandleCompleteBill}>Thanh toán</Button> */}
                </Col>
                </Col>
            </Row>
      </div>
    </div>
    </ListContext.Provider>
  );
}

export default Cart;
