
import React from "react";

import {
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table, 
} from "reactstrap";
import {Button, Card} from "react-bootstrap";

import food1 from "../assets/img/food-1.jpg";
import food2 from "../assets/img/food-2.jpg";
import food3 from "../assets/img/food-3.jpg";
import food4 from "../assets/img/food-4.jpg";
import food5 from "../assets/img/food-5.jpg";
import food6 from "../assets/img/food-6.jpg";

function Dashboard() {
  return (
    <>
      <div className="content">
        <Row>
          <Col>
            <div className="admin-sub-card">
              <CardBody>
                <h3>Trending Orders</h3>
                <Row>
                  <Col>
                    <Card style={{ width: '14rem' }}>
                      <Card.Img variant="top" src={food1} />
                      <Card.Body>
                        <Card.Title>Burger <span className="text-info" style={{marginLeft: 70}}>$25</span></Card.Title>
                        <span>Orders </span> <span className="text-danger">50</span>
                        <span style={{marginLeft: 30}}>Income </span><span className="text-danger">$150</span>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card style={{ width: '14rem' }}>
                      <Card.Img variant="top" src={food2} />
                      <Card.Body>
                        <Card.Title>Burger <span className="text-info" style={{marginLeft: 70}}>$25</span></Card.Title>
                        <span>Orders </span> <span className="text-danger">50</span>
                        <span style={{marginLeft: 30}}>Income </span><span className="text-danger">$150</span>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card style={{ width: '14rem' }}>
                      <Card.Img variant="top" src={food3} />
                      <Card.Body>
                        <Card.Title>Burger <span className="text-info" style={{marginLeft: 70}}>$25</span></Card.Title>
                        <span>Orders </span> <span className="text-danger">50</span>
                        <span style={{marginLeft: 30}}>Income </span><span className="text-danger">$150</span>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card style={{ width: '14rem' }}>
                      <Card.Img variant="top" src={food4} />
                      <Card.Body>
                        <Card.Title>Burger <span className="text-info" style={{marginLeft: 70}}>$25</span></Card.Title>
                        <span>Orders </span> <span className="text-danger">50</span>
                        <span style={{marginLeft: 30}}>Income </span><span className="text-danger">$150</span>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col  sm="12" md="6">
                    <Card>
                      <CardHeader>
                        <CardTitle tag="h4">Recent Order</CardTitle>
                      </CardHeader>
                      <CardBody style={{overflow: "hidden"}}>
                        <Table responsive>
                          <thead className="text-danger">
                            <tr>
                              <th>Order Name</th>
                              <th>Customer Name</th>
                              <th className="text-right">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>French Fries</td>
                              <td>Dakota Rice</td>
                              <td className="text-right">$36,738</td>
                            </tr>
                            <tr>
                              <td>Burger</td>
                              <td>Minerva Hooper</td>
                              <td className="text-right">$23,789</td>
                            </tr>
                            <tr>
                              <td>Chicken Tulli</td>
                              <td>Sage Rodriguez</td>
                              <td className="text-right">$56,142</td>
                            </tr>
                            <tr>
                              <td>Egg Sandwitch</td>
                              <td>Philip Chaney</td>
                              <td className="text-right">$38,735</td>
                            </tr>
                            <tr>
                              <td>Meat Stew</td>
                              <td>Doris Greene</td>
                              <td className="text-right">$63,542</td>
                            </tr>
                            <tr>
                              <td>Chips</td>
                              <td>Mason Porter</td>
                              <td className="text-right">$78,615</td>
                            </tr>
                            <tr>
                              <td>Burger</td>
                              <td>Jon Porter</td>
                              <td className="text-right">$98,615</td>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col  sm="12" md="6">
                    <Card>
                      <CardHeader>
                        <CardTitle tag="h4">Recent Customers</CardTitle>
                      </CardHeader>
                      <CardBody style={{overflow: "hidden"}}>
                        <Table responsive>
                          <thead className="text-danger">
                            <tr>
                              <th>Name</th>
                              <th>Location</th>
                              <th>Email</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Dakota Rice</td>
                              <td>Oud-Turnhout</td>
                              <td>dakotar@ejs.com</td>
                            </tr>
                            <tr>
                              <td>Minerva Hooper</td>
                              <td>Sinaai-Waas</td>
                              <td>mhooper1@rea.com</td>
                            </tr>
                            <tr>
                              <td>Sage Rodriguez</td>
                              <td>Baileux</td>
                              <td>sagerodri@foo.com</td>
                            </tr>
                            <tr>
                              <td>Philip Chaney</td>
                              <td>Overland Park</td>
                              <td>pchaney@mail.com</td>
                            </tr>
                            <tr>
                              <td>Doris Greene</td>
                              <td>Feldkirchen in Kärnten</td>
                              <td>dorig@greene.com</td>
                            </tr>
                            <tr>
                              <td>Mason Porter</td>
                              <td>Gloucester</td>
                              <td>mason@duty.com</td>
                            </tr>
                            <tr>
                              <td>Jon Porter</td>
                              <td>Gloucester</td>
                              <td>jon@doe.com</td>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>  
                </Row> 
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
