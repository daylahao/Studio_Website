import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button, Dropdown } from 'react-bootstrap';
const listoption = ['Máy ảnh','Ống kính','Phụ kiện','Khác'];
function ListOptionAdmin({className,Options}) {
    return (
        <ListGroup variant='flush' className={className}>
        <Dropdown
        className='d-block d-md-none'>
            <Dropdown.Toggle className='form-control btn-success' 
        >Danh mục</Dropdown.Toggle>
            <Dropdown.Menu className='form-control p-0'>
        {Options==null?(listoption .map((item,index) => {
            return (
            <ListGroup.Item action variant="light" >
                <Row>
                    <Col className='text-center text-md-start'>
                {item}
                </Col>
                <Col sm={1} className='d-none d-md-block' >
                <i class="bi bi-caret-right-fill"></i>
                </Col>
                </Row>
        </ListGroup.Item>
            )
        })):(Options .map((item,index) => {
            return (
            <ListGroup.Item action variant="light" >
                <Row>
                    <Col className='text-center text-md-start'>
                {item}
                </Col>
                <Col sm={1} className='d-none d-md-block' >
                <i class="bi bi-caret-right-fill"></i>
                </Col>
                </Row>
        </ListGroup.Item>
            )
        }))
    }
        </Dropdown.Menu>
        </Dropdown>
        <div className='d-none d-md-flex flex-column flex-fill h-100 rounded-2'>
        {Options==null?(listoption .map((item,index) => {
            return (
            <ListGroup.Item action variant="light" >
                <Row className='p-0 p-md-3'>
                <Col className='text-center text-md-start'>
                {item}
                </Col>
                <Col sm={1} className='d-none d-md-block' >
                <i class="bi bi-caret-right-fill"></i>
                </Col>
                </Row>
        </ListGroup.Item>
            )
        })):(Options .map((item,index) => {
            return (
            <ListGroup.Item action variant="dark" href={`?action=${item.action}`} disabled={!item.status} >
                <Row className='p-0 p-md-3'>
                <Col className='text-center text-md-start'>
                {item.name}
                </Col>
                <Col sm={1} className='d-none d-md-block' >
                <i class="bi bi-caret-right-fill"></i>
                </Col>
                </Row>
        </ListGroup.Item>
            )
        }))
        }
        </div>
        </ListGroup>
    );
}

export default ListOptionAdmin;