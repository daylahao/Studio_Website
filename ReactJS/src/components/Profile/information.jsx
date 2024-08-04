import React, { useEffect, useState} from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import {userApi} from '../../services/ApiLogin';
import { DateTime } from 'luxon';

function Information(props) {
    const [isFetching, setIsFetching] = useState(true); 
    const [data, setData] = useState([]);
    const changeDate=(stringdate)=>{
        const receivedDate = stringdate;
        const dateInGMT7 = DateTime.fromISO(receivedDate).setZone('Asia/Bangkok');
        return new Date(dateInGMT7);
      }
    const handlebirthday=(stringdate)=>{
        const birthday = new Date(data.birthday);
// Lấy ngày, tháng, và năm
const day = birthday.getDate();
const month = birthday.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
const year = birthday.getFullYear();

// Định dạng ngày tháng năm theo ý muốn
const formattedDate = `${day}/${month}/${year}`;
return formattedDate;
    }
    useEffect(() => {
    document.title = "Thông tin cá nhân";
    if(isFetching){
    userApi.GetInformation().then((res) => {
      if(res.status === 200){
        console.log(res.data);
        setData(res.data);
      }
    })
}
    return () => {
        setIsFetching(false);
  }});
  return (
    <div className="d-flex flex-column " style={{ color:'var(--black)' }}>
      <header className="p-5">
        <Row>
          <Col xs={3} className="overflow-hidden">
            <Image
            width={"200"}
            height={"200"}
            roundedCircle
            className="border border-2 border-success"  
              src="http://localhost:3000/images/avatars/default.png"
              
            />
          </Col>
          <Col xs={9} className="d-flex align-items-center ">
          <Row>
            <Col xs={12}>
            <h4 className="h1 w-100 ">
              {data.name}
            </h4>
            </Col>
            <Col xs={12}>
            <h5>{data.role}</h5>
            </Col>
          </Row>
          </Col>
        </Row>
      </header>
      <div className="h-100 flex-fill px-5">
          <Row >
            <Col xs={12} md={10}>
            <h5>Thông tin cá nhân</h5>
            </Col>
          <Col xs={12} md={2}>
          <Button variant="success" className="float-end p-md-1 m-0">Chỉnh sửa <i class="bi bi-pencil-square"></i></Button>
          </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={4}>
              <p>Email:</p>
            </Col>
            <Col xs={8}>
              <p>{data.email}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <p>Phone:</p>
            </Col>
            <Col xs={8}>
              <p>{data.phone}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <p>BirthDay:</p>
            </Col>
            <Col xs={8}>
              <p>{handlebirthday(data.birthday)}</p>
            </Col>
          </Row>
      </div>
      <div className="px-md-5 px-2">
        <hr></hr>
        <Row>
            <Col xs={12} md={9} className="  px-2">
            <Button variant="success" className="float-start m-0">Đổi mật khẩu <i class="bi bi-lock-fill"></i></Button>
            </Col>
            <Col xs={12} md={3}>
            <Button variant="danger" className="float-end m-0">Đăng xuất <i class="bi bi-box-arrow-right"></i></Button>
            </Col>
        </Row>
      </div>
    </div>
  );
}

export default Information;
