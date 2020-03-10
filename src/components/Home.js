import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default () => (
  <Container style={{ textAlign: 'center' }}>
    <Row>
      <Col>
        <h1>.rsk domains batch</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <h3>Choose domains</h3>
      </Col>
    </Row>
    <Row><Col><hr /></Col></Row>
    <Row>
      <Col>
        <h3>Validate domains</h3>
      </Col>
    </Row>
    <Row><Col><hr /></Col></Row>
    <Row>
      <Col>
        <h3>Calculate price</h3>
      </Col>
    </Row>
    <Row><Col><hr /></Col></Row>
    <Row>
      <Col>
        <h3>Execute registration</h3>
      </Col>
    </Row>
  </Container>
)

