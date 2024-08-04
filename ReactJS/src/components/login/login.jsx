import {useNavigate} from 'react-router-dom';
import React,{useContext, useEffect, useState  } from 'react';
import { ContextUsers } from '../../App';
import { Button } from 'react-bootstrap';
import { userApi } from '../../services/ApiLogin';
import { useCookies } from 'react-cookie';
function LoginComponent() {
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [togglepassword,setTogglepassword]= useState(false);
    const navigate  = useNavigate();
    const { user, setUser } = useContext(ContextUsers);
    const [cookies, setCookie] = useCookies(['user']);
    const [Key, setKey] = useCookies(['auth']);
    const auth = (datas) =>{
        setUser({ loggedIn: true,data:datas.user,key:datas.auth });
        setCookie('user', datas.user, { path: '/' });
        localStorage.setItem('key', datas.auth);
        setKey('auth', datas.auth, { path: '/' });
        navigate('/');
    }
    const handletogglepassword = () =>{
        let password = document.getElementById("Password");
        console.log(this);
        if(password.type === "password"){
            password.type = "text";
            setTogglepassword(true);
        }else{
            password.type = "password";
            setTogglepassword(false);
        }}
    const Sendlogin = ()=>{
        const form = JSON.stringify({name:name,password:password});
        console.log(form)
        // const form = JSON.stringify({name:name,email:email,phone:value,password:password,birthday:birthday,gender:gender,role:'USER'});
        userApi.LoginUser(form).then((result) => {
            console.log(result);
            if(result.status===200){
                console.log(result.data.auth);
                auth(result.data)};
        }).catch((err) => {
            console.log(err);
        });
        // alert(form);
    }
    useEffect(() => {
        // auth();
    },[]);
    return (
        <div className='container-xxl h-100 flex-fill d-flex flex-column justify-content-center' style={{
            color: 'var(--white)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: "url(https://png.pngtree.com/thumb_back/fh260/background/20230625/pngtree-black-photography-studio-a-stunning-3d-render-image_3677637.jpg)",
        }}>
            <div id='containerloginregister' className='mt-5 pt-5 pb-3'>
            <div className='w-100 d-flex flex-column align-items-center justify-content-center'>
                <form className='col-12 col-md-6 rounded-3 d-flex flex-column p-3 p-md-5 gap-4 shadow-lg' style={{ backgroundColor:"var(--blackblur)" }}>
                <h2 className='h2'>Đăng nhập tài khoản</h2>
                <div className='col-12 d-flex flex-column'>
                    <label for="NameEmail" className='form-label '>Tên hoặc Email</label>
                    <input id="NameEmail" name="name" type="text" className='form-control rounded-5' placeholder='Nhập Tên hoặc Email' onChange={(e)=>setName(e.target.value)}></input>
                </div>
                <div className='col-12 d-flex flex-column'>
                    <label for="Password" className='form-label '>Mật khẩu</label>
                    <div className='w-100 position-relative'>
                    <input id="Password" name="password" type="password" className='form-control rounded-5 pe-5' placeholder='Nhập mật khẩu' onChange={(e)=>setPassword(e.target.value)}></input>
                    <button onClick={handletogglepassword} className='position-absolute end-0 top-50 h-100 translate-middle' style={{ border:'none', background:'none' }} type='button'>
                    {togglepassword===true?(<i class="bi bi-eye-fill"></i>):(
                        <i class="bi bi-eye-slash-fill"></i>
                    )}
                    </button>
                    </div>
                </div>
                <Button variant='success' type='button' className='btn btn-success p-2 col-12 col-md-5 ms-md-auto' onClick={Sendlogin}>
                    Đăng nhập
                </Button>
                <div class="d-flex flex-row col-12 align-items-center">
                    <a href='#' >Quên mật khẩu?</a>
                    <Button className='btn p-1 col-6 col-md-3 btn-link ms-auto bg-transparent' type='button' href="/register" >Đăng kí</Button>
                </div>
                </form>
            </div>
            </div>
        </div>
    );
}

export default LoginComponent;