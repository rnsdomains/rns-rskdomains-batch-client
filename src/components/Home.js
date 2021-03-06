import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChooseDomains from './ChooseDomains';
import CalculatePrice from './CalculatePrice';
import ChooseOwner from './ChooseOwner';
import ExecuteRegistrations from './ExecuteRegistrations';

export default () => (
  <Container style={{ textAlign: 'center' }}>
    <Row>
      <Col>
        <h3>Choose domains</h3>
        <ChooseDomains />
      </Col>
    </Row>
    <Row><Col><hr /></Col></Row>
    <Row>
      <Col>
        <h3>Calculate price</h3>
        <CalculatePrice />
      </Col>
    </Row>
    <Row><Col><hr /></Col></Row>
    <Row>
      <Col>
        <h3>Choose owner</h3>
        <ChooseOwner />
      </Col>
    </Row>
    <Row><Col><hr /></Col></Row>
    <Row>
      <Col>
        <h3>Execute registration</h3>
        <ExecuteRegistrations />
      </Col>
    </Row>
  </Container>
);
