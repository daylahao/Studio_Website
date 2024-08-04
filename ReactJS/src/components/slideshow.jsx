import React,{useEffect,useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
function Slideshow({listImage,controls,description,indicators,height='100vh',css='0px',bsPrefix='carousel'}) {
    return (
        <Carousel className={css+'rounded-3 overflow-hidden'} style={{ height:`${height}`, maxWidth:'100%',maxHeight:'100%'}}
            controls={controls}
            indicators = {indicators}
            bsPrefix = {bsPrefix}
        >
        {listImage.map((item,index) => {
            return (
                <Carousel.Item key={index}>
                {/* <img src={item.url} className='fluid'></img> */}
                <div className='no-repeat' style={{ height:`${height}`, width:'100%',maxHeight:'100vh', backgroundImage:`url(${item.url})`,  backgroundRepeat: 'no-repeat',backgroundPosition:'center',backgroundSize:'cover'}}></div>
                {description?(
                <Carousel.Caption className='col-12 col-md-4 p-4 ms-md-5 mt-auto  shadow-lg rounded-3 start-0 b-0' style={{
                    backgroundColor:'rgba(0,0,0,0.5)',
                 }}>
                    <h3 className='h3 text-start'>{item.title}</h3>
                    <p style={{ textAlign: 'justify',textJustify: 'inter-word'  }}>{item.description}</p>
                </Carousel.Caption>
                ):(null)}
                </Carousel.Item>
            );
        })}
      </Carousel>
    );
}

export default Slideshow;