import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { ContextUsers } from "../../App";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import {registerApi} from "../../services/register";
function Register(props) {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [birthday,setBirthday] = useState(new Date()); 
  const [passwordagain, setPasswordagain] = useState();
  const [gender, setGender] = useState(0);
  const [textdate, setTextdate] = useState();
  const [togglepassword, setTogglepassword] = useState(false);
  const [togglepassword2, setTogglepassword2] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(ContextUsers);
  const [value, setValue] = useState();
  const auth = () => {
    setUser({ loggedIn: true });
    sessionStorage.setItem("Token", true);
    navigate("/");
  };
  const handleDateChange = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(7, 0, 0, 0);
    setBirthday(adjustedDate);
    console.log('Selected Date:', date);
  };
  const handleCheckGender = (e) => {
    console.log(e.target.value);
    setGender(e.target.value);
    console.log(gender)
  }
  const RegisterAccount = ()=>{
    const form = JSON.stringify({name:name,email:email,phone:value,password:password,birthday:birthday,gender:gender,role:'USER'});
    registerApi.CreateUser(form).then((res)=>{
      res.status === 200 ? console.log('thanhf ong '): alert("Đăng kí thất bại");
    })
    console.log(form);
  }
  const checkonlynumber = (e) => {
    // let value = e.target.value;
    const re = /^[0-9\b]+$/;
    // if value is not blank, then test the regex

    if (e.target.value === "" || re.test(e.target.value)) {
      let value = e.target.value;
      if (!isNaN(+value)) e.value = value;
    } else {
      e.target.value = e.target.value.slice(0, -1);
    }
  };
  const handlephoneout = (e) => {
    let value = e.target.value;
    let strtemp = "";
    // alert(value[0]);
    value.split("").forEach((element, index) => {
      if (!isNaN(+element)) {
        strtemp += element;
      }
    });
    e.target.value = strtemp;
  };
  const handletogglepassword = (e) => {
    let password = document.getElementById("Password");
    console.log(this);
    if (password.type === "password") {
      password.type = "text";
      setTogglepassword(true);
    } else {
      password.type = "password";
      setTogglepassword(false);
    }
  };
  const handletogglepassword2 = (e) => {
    let password = document.getElementById("Password2");
    console.log(this);
    if (password.type === "password") {
      password.type = "text";
      setTogglepassword2(true);
    } else {
      password.type = "password";
      setTogglepassword2(false);
    }
  };
  return (
    <div
      id="register"
      className="container-xxl h-100 flex-fill d-flex flex-column justify-content-center"
      style={{
        color: "var(--white)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "url(https://t3.ftcdn.net/jpg/00/35/94/44/360_F_35944424_YGSDMaCU6PCosD5W3xuH7wdUPMTpkkp8.jpg)",
      }}
    >
      <div id="containerloginregister" className="mt-5 pt-5 pb-3">
        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
          <form
            className="form-floating col-12 col-md-6 rounded-3 d-flex flex-column p-3 p-md-5 gap-4 shadow-lg "
            style={{ backgroundColor: "var(--blackblur)" }}
          >
            <h2 className="h2">Đăng kí tài khoản</h2>
            <div className="col-12 d-flex flex-column ">
              <label for="Name" className="form-label ">
                Tên tài khoản
              </label>
              <input
                id="Name"
                name="name"
                type="text"
                className="form-control rounded-3"
                placeholder="Nhập Tên"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="col-12 d-flex flex-column">
              <label for="Email" className="form-label ">
                Email đăng kí
              </label>
              <input
                id="Email"
                name="email"
                type="text"
                className="form-control rounded-3 "
                placeholder="Nhập Email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="col-12 d-flex flex-column flex-md-row  gap-2 pe-2">
            <div className="col-12 col-md-6 d-flex flex-column">
              <label for="Email" className="form-label">
                Ngày/tháng/năm sinh:
              </label>
              <DatePicker dateFormat="dd/MM/yyyy" type="date" className="form-control" selected={birthday} onSelect={handleDateChange} onChange={handleDateChange}
              ></DatePicker>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Giới tính</label>
              <div className="form-control rounded-3 align-items-center justify-content-between d-flex">
              <div className="d-flex w-100 gap-2 align-items-center justify-content-center" >
              <input id="gender0" name="gender"  type='radio' value='0' checked={gender==='0'} onClick={handleCheckGender}></input>
              <label for='gender0' className="" style={{cursor:'pointer'}} >Nam</label></div>
              <div className="d-flex w-100 gap-2 align-items-center justify-content-center">
              <input id="gender1" name="gender"   type='radio' value='1' checked={gender==='1'} onClick={handleCheckGender}></input>
              <label for='gender1' className="" style={{cursor:'pointer'}}>Nữ</label></div>
              <div className="d-flex w-100 gap-2 align-items-center justify-content-center">
              <input id="gender2" className="" name="gender"   type='radio' value='2' checked={gender==='2'} onchange={handleCheckGender} onClick={handleCheckGender} ></input>
              <label for='gender2' style={{cursor:'pointer'}}>Khác</label></div>
              </div>
            </div>
            </div>
            {/* <div className='col-12 d-flex flex-column'>
                    <label for="Phone" className='form-label '>Số điện thoại</label>
                    <input id="Phone" name="phone" type="text" className='form-control rounded-3' placeholder='Nhập Số điện thoại' onBlur={handlephoneout} onChange={checkonlynumber}></input>
                </div> */}
            <div className="col-12 d-flex flex-column">
              <label for="Phone" className="form-label ">
                Số điện thoại
              </label>
              <PhoneInput
                className="form-control p-1 m-0 rounded-3 d-flex flex-row ps-3"
                international
                name="phone"
                defaultCountry="VN"
                value={value}
                onChange={setValue}
              />
            </div>
            <div className="col-12 d-flex flex-column">
              <label for="Password" className="form-label">
                Mật khẩu
              </label>
              <div className="w-100 position-relative">
                <input
                  id="Password"
                  name="password"
                  type="password"
                  className="form-control rounded-3 pe-5"
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button
                  type="button"
                  onClick={handletogglepassword}
                  className="position-absolute end-0 top-50 h-100 translate-middle"
                  style={{ border: "none", background: "none" }}
                >
                  {togglepassword === true ? (
                    <i class="bi bi-eye-fill"></i>
                  ) : (
                    <i class="bi bi-eye-slash-fill"></i>
                  )}
                </button>
              </div>
            </div>
            <div className="col-12 d-flex flex-column">
              <label for="Password2" className="form-label ">
                Nhập lại Mật khẩu
              </label>
              <div className="w-100 position-relative">
                <input
                  id="Password2"
                  name="passwordagain"
                  type="password"
                  className="form-control rounded-3 pe-5"
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => {setPasswordagain(e.target.value)
                    if(e.target.value !== password){
                      e.target.setCustomValidity("Mật khẩu không khớp");
                  }}}
                ></input>
                <button
                  type="button"
                  onClick={handletogglepassword2}
                  className="position-absolute end-0 top-50 h-100 translate-middle"
                  style={{ border: "none", background: "none" }}
                >
                  {togglepassword2 === true ? (
                    <i class="bi bi-eye-fill"></i>
                  ) : (
                    <i class="bi bi-eye-slash-fill"></i>
                  )}
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={RegisterAccount}
              className="btn btn-success p-2 col-12 col-md-5 ms-md-auto"
            >
              Đăng kí
            </button>
            <div class="d-flex flex-row col-12">
              <Button
                variant="link"
                href="/login"
                className="p-1 col-8 col-md-5"
                type="button"
              >
                Đã có tài khoản, Đăng nhập?
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
