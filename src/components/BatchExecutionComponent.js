import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

class BatchExecutionComponent extends Component{
  constructor(props){
    super(props);

    this.state = {
      tx: null,
      confirmed: false,
    };

    this.commit = this.commit.bind(this);
  }

  commit() {
    const { method, success, sender } = this.props;

    method.send({ from: sender })
    .on('transactionHash', tx => {
      this.setState({ tx });
    })
    .on('receipt', _ => {
      this.setState({ confirmed: true });
      success();
    });
  }

  render () {
    const { from, to } = this.props;
    const { tx, confirmed } = this.state;

    return <>
      <Row>
        <Col><label>From {from} to {to}</label></Col>
        <Col><Button onClick={this.commit} disabled={!!tx}>Sign</Button></Col>
      </Row>
      {
        tx && <>
          <Row>
            <Col>
              <a href={`${process.env.REACT_APP_EXPLORER_TX_BASEURL}${tx}`} target="_blank" rel="noopener noreferrer">{tx}</a>
            </Col>
          </Row>
          <Row>
            <Col>
              {
                confirmed ? <p>Confirmed!</p> : <p>Waiting for confirmations...</p>
              }
            </Col>
          </Row>
        </>
      }
    </>
  }
}

export default BatchExecutionComponent;
