
import React, {useState, useEffect} from "react";
import {Badge, Container, Row, Col, ListGroup} from "react-bootstrap";
import CurrencyDisplay from "react-currency-format";

export default function OrderRow({purchase}){
  const [dropDown, setDropDown] = useState(false);
  //const [orders, setOrders] = useState(purchase.orders);

  function handleClick(e){
    e.preventDefault();
    setDropDown(!dropDown);
  }

  return (
    <>
      <ListGroup.Item onClick={handleClick} style={{cursor: "pointer"}} className={purchase.checked ? "" : "checkered"}>
        <Row>
          <Col>{purchase.email}</Col>
          <Col sm={5}>{purchase.address}</Col>
          <Col><Badge bg="danger">{purchase.status}</Badge></Col>
          <Col><CurrencyDisplay 
            value={Number(purchase.amount)} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'₦ '} 
            renderText={value => <span>{value}</span>} /></Col>
        </Row>
          {dropDown && purchase.items.map((item, i) => (
            <Container className="bg-light" key={i}>
              <Row>
                <Col>
                  {item.name}
                </Col>
                <Col>
                  x{item.quantity}
                </Col>
                <Col className="text-right">
                <CurrencyDisplay 
                  value={Number(item.price)} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'₦ '} 
                  renderText={value => <span>{value}</span>} />
                </Col>
                <hr/>
              </Row>
            </Container>
          ))}
      </ListGroup.Item>
    </>
  )
}
