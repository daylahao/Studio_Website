import React from 'react';
import Slideshow from "./slideshow";
function SlideHeader({listImage}) {
    return (
        <div style={{ height: "33.3333333333vh" }}>
        <Slideshow
          listImage={listImage}
          description={false}
          controls={false}
          indicators={false}
          css={"height: 33.3333333333vh"}
          height="33.3333333333vh"
        />
      </div>
    );
}

export default SlideHeader;