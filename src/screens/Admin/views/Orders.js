
import React, {useEffect, useState} from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import {Badge, ListGroup} from "react-bootstrap";
import OrderRow from "./OrderRow";
import {getUrl} from "../../../helper/url-helper";

function Orders() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, [])

  async function fetchOrders(){
    let response = await fetch(`${getUrl()}/items/orders/purchases`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
     }
   })

    let rs = await response.json()

    console.log(rs);

    if (rs.length){
      setPurchases(rs);
    } else {
      console.log(rs)
    }
  }

  function updateOrders(item, index){
    let tempOrders = [...purchases];
    tempOrders[index] = item;
    setPurchases(tempOrders);
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
              <CardHeader>
                <CardTitle tag="h4">Order Table</CardTitle>
              </CardHeader>
              <CardBody style={{overflow: "hidden"}}>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col><span>Email</span></Col>
                      <Col sm={5}><span>Address</span></Col>
                      <Col><span>Status</span></Col>
                      <Col><span>Price</span></Col>
                    </Row>
                  </ListGroup.Item>
                  {purchases.map((purchase, i) => (
                    <OrderRow purchase={purchase} key={i} index={i} updateOrders={updateOrders}/>
                  ))}
                </ListGroup>
              </CardBody>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Orders;
