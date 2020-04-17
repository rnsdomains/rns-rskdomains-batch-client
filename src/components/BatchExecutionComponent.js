import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

class BatchExecutionComponent extends Component{
  constructor(props){
    super(props);

    this.state = {
      tx: null,
      confirmed: false,
      error: null,
    };

    this.commit = this.commit.bind(this);
  }

  commit() {
    const { method, success, sender } = this.props;

    method.send({ from: sender })
      .on('transactionHash', tx => {
        this.setState({ tx });

        const checkInterval = setInterval(() => {
          window.ethereum.sendAsync({
            method: 'eth_getTransactionByHash',
            params: [tx],
          }, (error, response) => {
            if (error) {
              this.setState({ error })
            } else if (response && response.result && response.result.blockNumber) {
              this.setState({ confirmed: true });
              success();
              clearInterval(checkInterval);
            }
          });
        }, 2000);
      })
      .catch(error => this.setState({ error }))
  }

  render () {
    const { from, to } = this.props;
    const { tx, confirmed, error } = this.state;

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
              {error}
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
