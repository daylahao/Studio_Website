import React from 'react';
function ListImageGallery({ListImage}) {
    return (
        <div id='ListImageGallery' className='d-flex flex-wrap' style={{ height:'fit-content' }} >
            {ListImage.map((item,index) => {
                return (
                    <div  className='containerImageGallery col-6 col-md-4 p-3 d-flex overflow-hidden rounded-3' style={{ height:'300px', paddingTop:'100%'}}>
                        <img src={item.imagepath['0']} className='ImageInAlbum rounded-3 start-0 top-0 w-100' style={{ 
                            objectFit: 'cover',
                         }}></img>
                    </div>
            )
            })};
        </div>
    );
}

export default ListImageGallery;