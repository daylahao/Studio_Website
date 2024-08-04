import React,{useEffect,useState} from 'react';
import EmailFooter from './emailFooter';
import { useLocation,useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
const ListOffEmail = [
    '/register','/login'
]
const AuthPage = [
    "/admin",
    "/cart",
    "/profile"
]
function Footer(props) {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies();
    let location = useLocation();
    const [Toggleemail,setToggleemail] = useState(true);
    const AuthLogin = ()=>{
        if(cookies.auth){
            setToggleemail(false);
            return true;
        }else{
            setToggleemail(true);
            ListOffEmail.map((item)=>{
                if(location.pathname===item){
                    setToggleemail(false);
                }
            })
            AuthPage.map((item)=>{
                if(location.pathname===item){
                    return navigate('/login');
                }
            })
            return false;
        }
    }
    useEffect(() => {
        AuthLogin();
    },[]);
    return (
        <footer class="text-center bg-body-tertiary mt-auto">
        <div class="container w-100 pt-4 d-flex flex-md-row flex-column">
        <section className={`${Toggleemail===false?('d-none '):('d-block ')}col-md-8`}>
                <EmailFooter/>
            </section>
            <section class={`${Toggleemail===true?('justify-content-md-end align-items-md-end '):('w-100 align-items-center ')} d-flex flex-column col-12 col-md-4 justify-content-center `}>
            <div className='d-flex flex-row  justify-content-center col-12 col-md-6 '>
            <a
                data-mdb-ripple-init
                class="btn btn-link btn-floating btn-lg text-body m-1"
                href="#!"
                role="button"
                data-mdb-ripple-color="dark"
                ><i class="bi bi-facebook"></i></a>
            <a
                data-mdb-ripple-init
                class="btn btn-link btn-floating btn-lg text-body m-1"
                href="#!"
                role="button"
                data-mdb-ripple-color="dark"
                ><i class="bi bi-instagram"></i></a>
            <a
                data-mdb-ripple-init
                class="btn btn-link btn-floating btn-lg text-body m-1"
                href="#!"
                role="button"
                data-mdb-ripple-color="dark"
                ><i class="bi bi-youtube"></i></a>
            </div>
            <div className='col-12 col-md-6'>
            <img src={"../LOGOTEXT_BLACK.png"} alt="" className="m-md-0 m-auto"style={{ height:'50px' , width:'50px'}} />
            </div>
            </section>
        </div>
        <div class="text-center p-3 d-flex flex-column" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
            © 2024 Copyright: DoHungHao
        </div>
        </footer>
    );
}

export default Footer;