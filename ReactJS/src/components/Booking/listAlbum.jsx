import React from 'react';
import {Button} from 'react-bootstrap';
function ListAlbum({listConcept,button1,button2}) {
    return (
            <div className='w-100'>
            {listConcept.map((album,index)=>{
                return (
                <div className={`${(index%2)===0?('flex-md-row text-md-end '):('flex-md-row-reverse ')}`+'d-flex gap-3 flex-column-reverse col-12 justify-content-between p-3'}>
                    <div className='col-md-6'>
                        <h2 className='h2 '>
                            {album.name}
                        </h2>
                        {album.subtitle?(
                        <h5 className='h4 '>
                            {album.subtitle}
                        </h5>):(null)}
                        <p className=' text-justify'>
                            {album.content}
                        </p>
                        <div className={`${index%2==0?('ms-auto '):('')}`+' d-flex col-12 col-md-6 justify-content-around'}>
                            {button1?(<Button className={`${button2?('col-4'):('col-12 p-3 btn-link-success')} btn btn-success `} href={`${album.link}`} >{button1}</Button>):(null)}
                            {/* {button2?(<button className='btn btn-outline-success col-4'>{button2}</button>):(null)} */}
                        </div>
                    </div>
                    <div className=' container-listalbum col-md-6 rounded-3 overflow-hidden d-flex justify-content-center p-md-5 pt-md-0'>
                        <img src={album.imagepath[0]} alt={album.name} className='rounded-3 w-100' style={{ objectFit: 'cover',maxHeight:'100%', }}/>
                    </div>
                </div>
                )
            })};
            </div>
    );
}

export default ListAlbum;