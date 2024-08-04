import { set } from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Image, Button } from "react-bootstrap";
import { ListContext } from "./carts";
import DatePicker from "react-datepicker";
import { apiCarts } from "../../services/ApiCarts";
import { DateTime } from 'luxon';
function Itemcarts({ itemdata, id }) {
  const { listCards, setListCards } = useContext(ListContext)[0];
  const { isHandleTotal, setIsHandleTotal } = useContext(ListContext)[1];
  const [totalDays, setTotalDays] = useState(0);
  const [idx, setIdx] = useState(0);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [isfetching, setIsFetching] = useState(true);
  const [quality, setQuality] = useState(1);
  const updateTotal = () => {
    listCards[id].id_itemcart  = idx;
    console.log(listCards[id]);
    listCards[id].end = checkOutDate;
    listCards[id].received = checkInDate;
    listCards[id].total_quantity = quality;
    listCards[id].total = quality * totalDays * (itemdata.price * 1);
    setListCards(listCards);
    setIsHandleTotal(true);
    UpdateDB();
  };
  const UpdateDB = () => {
    apiCarts.updateItemCart(listCards[id]).then((res) => {
      // alert(res.data);
    });
  };
  const HandleDeleteItem = () => {
    apiCarts.deleteItemCart({id_itemcart:idx}).then((res) => {
      if(res.data){
        listCards.splice(id,1);
        setIsHandleTotal(true);
      }
    });
  };
  const handleDecreaseQuality = (e) => {
    if (quality > 1) {
      setQuality(quality - 1);
      updateTotal();
    }
  };
  const handleUpdateQuality = (e) => {
    setQuality(quality + 1);
    updateTotal();
  };
  const checkonlynumber = (e) => {
    // let value = e.target.value;
    const re = /^[0-9\b]+$/;
    // if value is not blank, then test the regex

    if (e.target.value === "" || re.test(e.target.value)) {
      let value = e.target.value;
      if (!isNaN(+value)) setQuality(value);
    } else {
      e.target.value = e.target.value.slice(0, -1);
    }
  };
  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    setCheckOutDate(null);
  };
  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
    calculateDays(date);
  };
  const formatCurrency = (value) => {
    updateTotal();
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const calculateDays = (dateout) => {
    // console.log(checkInDate, dateout);
    if (checkInDate && dateout) {
      // const diffTime = Math.abs(checkOutDate - checkInDate);
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffTime = dateout.getTime() - checkInDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      console.log(diffDays);
      setTotalDays(diffDays);
    }
  };
  const changeDate=(stringdate)=>{
    const receivedDate = stringdate;
    const dateInGMT7 = DateTime.fromISO(receivedDate).setZone('Asia/Bangkok');
    return new Date(dateInGMT7);
  }
  useEffect(() => {
    if (isfetching) {
      setIdx(itemdata.id_itemcart);
      setIsHandleTotal(true);
      // setQuality(Number(itemdata.quality));
      setQuality(Number(itemdata.quantity));
      if (new Date(itemdata.received).getTime() < new Date().getTime()) {
        setCheckInDate(new Date());
      } else {
        setCheckInDate(changeDate(itemdata.received));
        console.log(checkInDate)
      }
      if (new Date(itemdata.end).getTime() < new Date().getTime()) {
        calculateDays(new Date());
      } else {
        setCheckOutDate(changeDate(itemdata.end));
        calculateDays(changeDate(itemdata.end));
      }
    }
    return () => {
      // setIsHandleTotal(true);
      setIsFetching(false);
    };
  }, []);
  if (isfetching) {
    return <div>Loading...</div>;
  }
  if(listCards.length === 0){
    return <div className='d-flex w-100 text-center justify-content-center p-5 border-1 border rounded-3'>Không có sản phẩm nào trong giỏ hàng</div>;
  }
  else
    return (
      <Row className="boder-dark border rounded-3 p-3 w-100 m-0">
        <Col xs={12} md={7} lg={8}>
          <Row className="flex-column flex-md-row">
            <Col xs={12} md={4} className="my-auto flex-shrink-0">
              <Image
                className="w-100 flex-shrink-0"
                src={itemdata.image}
                rounded
              />
            </Col>
            <Col>
              <Col className="form-control border-0">{itemdata.name}</Col>
              <Col
                className="d-flex flex-row justify-content-center align-items-center"
                md={12}
              >
                <Col>
                  <label className="form-control border-0"> Ngày thuê</label>
                  <DatePicker
                    className="form-control"
                    selected={checkInDate}
                    minDate={checkInDate}
                    onChange={handleCheckInDate}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
                <Col className="text-center h3">
                  <i class="bi bi-arrow-right"></i>
                </Col>
                <Col>
                  <label className="form-control  border-0"> Ngày trả</label>
                  <DatePicker
                    className="form-control"
                    selected={checkOutDate}
                    minDate={checkInDate}
                    onChange={handleCheckOutDate}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
              </Col>
              <Col
                className="align-items-end justify-content-end w-100 d-flex flex-column form-control border-0"
                md={12}
              >
                <p>Số lượng</p>
                <div className="d-flex col-6 justify-content-between gap-2 p-2 ps-0">
                  <Button
                    variant="success"
                    className="text-center"
                    onClick={handleDecreaseQuality}
                  >
                    -
                  </Button>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={checkonlynumber}
                  />
                  <Button
                    variant="success"
                    className="text-center p-2"
                    onClick={handleUpdateQuality}
                  >
                    +
                  </Button>
                </div>
              </Col>
            </Col>
          </Row>
        </Col>
        <Col md={3} lg={3}>
          <p className="form-control border-0 w-100 text-center h-100 d-flex justify-content-center align-items-center">
            <strong>
              {formatCurrency(quality * totalDays * (itemdata.price * 1))}
            </strong>
          </p>
        </Col>
        <Col md={2} lg={1}>
          <Button variant="outline-danger" className="h-100 w-100 " onClick={HandleDeleteItem}>
            <Col xs={12}>
              <i class="bi bi-trash3-fill col-12"></i>
            </Col>
            <Col xs={12}>Xóa</Col>
          </Button>
        </Col>
      </Row>
    );
}

export default Itemcarts;
