import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { AccountFilter } from "./AccountFilter.js/AccountFilter";
import { CategoryFilter } from "./CategoryFilter.js/CategoryFilter";
import { DateFilter } from "./DateFilter/DateFilter";

export const Filters = () => {
  const filterChangeHandler = (event) => {};
  return (
    <Container>
      <Form>
        {" "}
        <Row>
          <Col>
            <Form.Check
              type="switch"
              id={"filter"}
              label={"Apply Filter"}
              onCheck={filterChangeHandler}
            />
          </Col>
          <Col>
            <DateFilter />
          </Col>
          <Col>
            <CategoryFilter />
          </Col>
          <Col>
            <AccountFilter />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
