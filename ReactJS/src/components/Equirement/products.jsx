import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, redirect,useNavigate } from 'react-router-dom';
function Products(props) {
    const navigate = useNavigate();
    let {id} =useParams();
    let [text,setText] = React.useState('');
    useEffect(() => {
        if(!isNaN(id)){
            setText('daylaso');
        }else{
            navigate("/404", { replace: true });

        }
    }, []);
    return (
        <div
        className="container-xxl p-0 mt-5 pt-5 h-100 flex-fill d-flex flex-column "
        style={{
          color: "var(--white)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
            <h1 className='h1'>{text}</h1>
        </div>
    );
}

export default Products;