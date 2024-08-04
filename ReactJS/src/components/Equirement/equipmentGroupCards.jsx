import React, { useContext, useState } from "react";
import { Popupcontext } from "./equipment";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Container } from "react-bootstrap";
import PopupDate from "./popupDate";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import Modal from "react-bootstrap/Modal";
import { set } from "lodash";
import { apiItems } from "../../services/ApiListProducts";
import { useCookies } from "react-cookie";
function EquipmentGroupCards({ ListProducts }) {
  const [cookies, setCookie] = useCookies(['user']);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(0);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [quality, setQuality] = useState(1);
  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    setCheckOutDate(null);
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
  const handleUpdateQuality = (e) => {
    setQuality(quality + 1);
  };
  const handleDecreaseQuality = (e) => {
    if (quality > 1) {
      setQuality(quality - 1);
    }
  };
  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
    calculateDays(date);
  };
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    if(cookies['auth']==null){
      alert('Vui lòng đăng nhập để thực hiện chức năng này');
      return;
    }else{
    setCheckInDate(null);
    setCheckOutDate(null);
    setQuality(1);
    setTotalDays(0);
    setData(e.target.dataset.id);
    setShow(true);
    }
  };
  const opendetail = () => {
    alert("detail");
  };
  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const handleSave = () => {
    if(checkInDate==null||checkOutDate==null){
      return alert('Vui lòng chọn ngày thuê và ngày trả');
    }
    apiItems
      .AddItems({
        id_item: ListProducts[data].id_item,
        received: checkInDate,
        end: checkOutDate,
        quantity: quality,
        total: quality * totalDays * ListProducts[data].price,
      })
      .then((res) => alert(res));
    handleClose();
  };
  const calculateDays = (dateout) => {
    // console.log(checkInDate, dateout);
    if (checkInDate && dateout) {
      // const diffTime = Math.abs(checkOutDate - checkInDate);
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffTime = dateout.getTime() - checkInDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setTotalDays(diffDays);
    }
  };
  if (ListProducts.length > 0) {
    return (
      <Row className="flex-fill d-flex m-0 p-0">
        {ListProducts.map((item, index) => {
          return (
            <Col
              xs={6}
              sm={6}
              md={4}
              className="my-2 d-flex align-items-center justify-content-center p-0"
            >
              <Card className="flex-fill h-100 d-flex">
                <a onClick={opendetail}>
                  <Card.Img
                    variant="bottom"
                    src={item.image}
                    className="flex-shrink-1 p-3 flex-fill "
                    style={{}}
                  />
                </a>
                <Card.Body className="justify-content-end d-flex flex-column align-items-center my-2 flex-fill ">
                  <Col className="w-100">
                    <Card.Text className="form-label h6">{item.name}</Card.Text>
                    <Card.Text
                      className="form-label w-100 text-start text-truncate"
                      style={{ maxWidth: "100%" }}
                    >
                      {item.description}
                    </Card.Text>
                  </Col>
                  <Row className="p-0 p-md-1 col-12 d-flex justify-content-between">
                    <Col xs={12} xl={5} className="p-0 my-1">
                      <Button
                        data-id={index}
                        variant="success"
                        className="w-100"
                        onClick={handleShow}
                      >
                        Chọn ngày
                      </Button>
                    </Col>
                    <Col xs={12} xl={5} className="p-0 my-1">
                      <Button variant="outline-success" className="w-100">
                        Chi tiết
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          className=" top-0 start-0 bottom-0 end-0 p-0 m-0 w-100"
        >
          <div className="justify-content-center">
            <Modal.Header closeButton>
              <Modal.Title>Thuê thiết bị</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
              <p>
                Tên sản phẩm: <strong>{ListProducts[data].name}</strong>
              </p>
              <label>Chọn ngày thuê</label>
              <DatePicker
                className="w-100 form-control"
                selected={checkInDate}
                minDate={new Date()}
                onChange={handleCheckInDate}
                dateFormat="dd/MM/yyyy"
              />
              <label>Chọn ngày trả</label>
              <DatePicker
                className="w-100 form-control"
                selected={checkOutDate}
                minDate={checkInDate}
                onChange={handleCheckOutDate}
                dateFormat="dd/MM/yyyy"
              />
              <label className="form-label">Số lượng</label>
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
              <p className="w-100 text-end h5">
                Giá:{quality} X {totalDays} X{" "}
                {formatCurrency(ListProducts[data].price)} ={" "}
                <strong>
                  {formatCurrency(
                    quality * totalDays * ListProducts[data].price
                  )}
                </strong>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Đặt hàng
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </Row>
    );
  } else {
    return (
      <div
        className="h-100 text-center w-100 d-flex justify-content-center align-items-center"
        style={{ color: "var(--black)" }}
      >
        Không tồn tại thiết bị cho thuê nào{" "}
      </div>
    );
  }
}

export default EquipmentGroupCards;
