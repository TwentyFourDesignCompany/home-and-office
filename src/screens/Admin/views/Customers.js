
import React, {useState, useEffect} from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

function Customers() {
  const [purchases, setPurchases] = useState([]);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Customers Table</CardTitle>
              </CardHeader>
              <CardBody style={{overflow: "hidden"}}>
                <Table responsive>
                  <thead className="text-danger">
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Address</th>
                      <th>Email</th>
                      <th className="text-right">Bill</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Customers;
