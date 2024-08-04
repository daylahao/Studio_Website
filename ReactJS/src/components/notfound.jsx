import React from 'react';

function Notfound(props) {
    return (
        <div       className="container-xxl p-0 h-100 flex-fill d-flex flex-column p-5"
        style={{
          color: "var(--white)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
            <img src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1721952000&semt=ais_user" alt="404 Not Found" className='w-100'></img>
        </div>
    );
}

export default Notfound;