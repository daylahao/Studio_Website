import React, { useEffect, useState} from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import {userApi} from '../../services/ApiLogin';
import { DateTime } from 'luxon';
import { useCookies, } from 'react-cookie';
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import { remove, set } from "lodash";
function Information(props) {
  const navigate = useNavigate();  
  const [cookies, setCookies,removeCookie] = useCookies(["user"]);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [editStatus, setEditStatus] = useState(searchQuery.get("edit")==='true'||false);
  const [isFetching, setIsFetching] = useState(true); 
  const [birthdayInput, setBirthdayInput] = useState(new Date());
    const [data, setData] = useState([]);
    const [avtarValue, setAvtarValue] = useState();
    const handleimportAvatar = (e)=>{
      if(e.target.files.length>0){
        setData({...data,avt:e.target.files[0]});
        setAvtarValue(URL.createObjectURL(e.target.files[0]));
        // userApi.UpdateUser(cookies['user'].UID,formData).then((res)=>{
        //   if(res.status===200){
        //     console.log(res.data);
        //     window.location.reload();
        //   }}).catch((err)=>{
        //     alert(err);
        //   });
    }}
    const saveData = ()=>{ 
      const formData = new FormData();
      formData.append('avt',data.avt);
      formData.append('name',data.name);
      formData.append('email',data.email);
      formData.append('phone',data.phone);
      formData.append('birthday',data.birthday);
      // console.log(JSON.stringify(data));
      userApi.UpdateUser(formData).then((res)=>{
        if(res.status===200){
          console.log(res.data);
          window.location.reload();
        }}).catch((err)=>{
          alert(err);
        });
    }
    const changeDate=(stringdate)=>{
        const receivedDate = stringdate;
        const dateInGMT7 = DateTime.fromISO(receivedDate).setZone('Asia/Bangkok');
        return new Date(dateInGMT7);
      }
      const handleLogout = () => {
        localStorage.removeItem("key");
        removeCookie("user");
        removeCookie("auth");
        navigate("/");
      };
      const handleDateChange=(date)=>{
        if(birthdayInput===null||birthdayInput===undefined){
          setBirthdayInput(date.birthday);
        }
        setBirthdayInput(date);
        setData({...data,birthday:date});
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
        setBirthdayInput(changeDate(res.data.birthday));
        if(res.data.avt)
        {
            setAvtarValue(res.data.avt);
        }
      }
    })
}
    return () => {
        setIsFetching(false);
  }});
  if(editStatus){
  return (
    <div className="d-flex flex-column " style={{ color:'var(--black)' }}>
      <header className="p-5 ">
        <Row className="d-flex flex-column flex-md-row">
          <Col xs={12} md={4} className="overflow-hidden align-items-center d-flex justify-content-center">
            <div style={{ width: '200px', height:'200px' }} className="imageContainerHoverChange h5 rounded-circle"  onClick={()=>{
                document.getElementById("importAvtar").click();
              }}>
            <Image
            width={"200"}
            height={"200"}
            roundedCircle
            className="border border-2 border-success imageHoverChange"  
              src={avtarValue?avtarValue:"http://localhost:3000/images/avatars/default.png"}
             
            />
            </div>
            <input type="file" className="d-none" id="importAvtar" onChange={handleimportAvatar} name="importAvtar"  ></input>
          </Col>
          <Col xs={12} md={8} className="d-flex align-items-center justify-content-md-start justify-content-center text-center text-md-start ">
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
            <h5> Chỉnh thông tin cá nhân</h5>
            </Col>
          {/* <Col xs={12} md={2}>
          <Button variant="success" className="float-end p-md-1 m-0" onClick={()=>{
            setSearchQuery({...Object.fromEntries(searchQuery),edit:true});
            // console.log
          }}>Chỉnh sửa<i class="bi bi-pencil-square"></i></Button>
          </Col> */}
          </Row>
          <hr />
          <Row>
            <Col xs={4}>
              <p>Tên:</p>
            </Col>
            <Col xs={8}>
              <input className="form-control" value={data.name}
                onChange={(e) => {
                  setData({...data,name:e.target.value});
                }}
              ></input>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <p>Email:</p>
            </Col>
            <Col xs={8}>
              <input className="form-control" value={data.email}
                onChange={(e) => {
                  setData({...data,email:e.target.value});
                }}
              ></input>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <p>Phone:</p>
            </Col>
            <Col xs={8}>
            <PhoneInput
                className="form-control p-1 m-0 rounded-3 d-flex flex-row ps-3"
                international
                name="phone"
                defaultCountry="VN"
                value={
                  (data.phone+'')[0]==='+'?data.phone+'':
                  '+'+data.phone
                  // ()=>{

                  //   if(a[0]=='+'){
                  //     return data.phone+'';
                  //   }else{
                  //     return '+'+data.phone;
                  //   }
                  // }
                }
                onChange={(e)=>{
                  // alert();
                  setData({...data,phone:e});
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <p>BirthDay:</p>
            </Col>
            <Col xs={8}>
            <DatePicker dateFormat="dd/MM/yyyy" type="date" className="form-control w-100" selected={birthdayInput} onSelect={handleDateChange} onChange={handleDateChange}
              ></DatePicker>
              {/* <p>{handlebirthday(data.birthday)}</p> */}
            </Col>
          </Row>
      </div>
      <div className="px-md-5 px-2">
        <hr></hr>
        <Row className="justify-content-end">
            <Col xs={12} md={3} className=" px-2">
            <Button variant="danger" className="w-100 float-end m-0"
            onClick={()=>{
              setSearchQuery({...Object.fromEntries(searchQuery),edit:false});
              window.location.reload();
            }}
            >Huỷ</Button>
            </Col>
            <Col xs={12} md={3} className="px-2">
            <Button variant="success" className="w-100 float-end m-0"onClick={saveData} >Lưu thay đổi</Button>
            </Col>
        </Row>
      </div>
    </div>
  );}else
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
              src={data.avt?data.avt:"http://localhost:3000/images/avatars/default.png"}
              
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
          <Button variant="success" className="float-end p-md-1 m-0" onClick={()=>{
            setSearchQuery({...Object.fromEntries(searchQuery),edit:true});
            window.location.reload();
            // console.log
          }}>Chỉnh sửa <i class="bi bi-pencil-square"></i></Button>
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
            <Button variant="danger" className="float-end m-0" onClick={handleLogout}>Đăng xuất <i class="bi bi-box-arrow-right"></i></Button>
            </Col>
        </Row>
      </div>
    </div>
  );
}

export default Information;
