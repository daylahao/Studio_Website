import { Button } from 'react-bootstrap';
import React,{useState,useEffect} from 'react';
import { userApi } from '../services/ApiLogin';

function EmailFooter(props) {
  const [emailNotify,setEmailNotify] = useState('');
  const HandleSendEmailNoti = ()=>{
    console.log(emailNotify);
    userApi.SendEmail({email:emailNotify}).then((res)=>{
        setEmailNotify('');
        console.log(res);
    })
}
  useEffect(() => {
    setEmailNotify('');
  },[]);
  return (
  <div className='col-12 col-md-12'>
    <form action="">
      <div class=" d-flex flex-column flex-md-column col-12 ">
        <div class="col-12 d-flex flex-column flex-md-row align-items-center pb-md-3">
        <div class="pe-md-3 pb-3 pb-md-0 flex-shrink-0">
            <button className='btn btn-success p-2'>Đăng nhập/ Đăng kí</button>
        </div>
          <div data-mdb-input-init class="form-outline d-flex flex-md-row flex-column-reverse">
          <label class="form-label text-md-start" for="form5Example22">Hoặc nhập email để nhận thông báo mới</label>
          </div>
        </div>
        <div class="col-auto col-md-12  d-flex pb-3 gap-3 flex-md-row flex-column">
        <div className='col-12 col-md-4'>
        <input type="email" id="form5Example22" class="form-control " placeholder='Nhập địa chỉ Email' onChange={(e)=>{
            console.log(e.target.value);
            setEmailNotify(e.target.value);
        }}/>
        </div>
          <Button
          onClick={HandleSendEmailNoti}
          variant="outline-success"
          type='button'
          class=" btn flex-shrink-0 bg-transparent" style={{backgroundColor:'white !important'}}>
            Gửi Email
          </Button>
        </div>
      </div>
    </form>
  </div>
    );
}

export default EmailFooter;