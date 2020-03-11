import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import CSVReader from 'react-csv-reader';
import Web3 from 'web3';
import { labelsAvailable } from '../actions';

const web3 = new Web3('https://public-node.rsk.co');
const rskOwner = new web3.eth.Contract([
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "available",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
], '0x45d3e4fb311982a06ba52359d44cb4f5980e0ef1')

async function available (label) {
  return rskOwner.methods.available(web3.utils.sha3(label)).call();
}

const initialState = {
  error: null,
  validating: false,
  unconfirmedLabels: null,
  confirmed: 0,
};

class ChooseDomains extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.error = this.error.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  handleUploadFile(data) {
    this.setState({ ...initialState, validating: true });

    const labels = [];
    for (let i = 0; i < data.length; i += 1) {
      labels.push(data[i][0]);
    }

    for (let i = 0; i < labels.length; i += 1) {
      const label = labels[i];

      if (!label.length >= 5 || !label.match(/^[0-9a-z]+$/)) {
        return this.error(`Invalid domain: ${label}`);
      }
    }

    const allAvailable = [];

    for (let i = 0; i < labels.length; i += 1) {
      allAvailable.push(
        available(labels[i]).then(result => {
          if (!result) this.error(`Domain not available: ${labels[i]}. Please remove it from the list.`)
        })
      );
    }

    Promise.all(allAvailable).then(() => {
      this.setState({ validating: false, unconfirmedLabels: labels })
    });
  }

  error(errorMessage) {
    this.setState({ error: errorMessage });
  }

  confirm() {
    const { unconfirmedLabels } = this.state;
    this.setState({ confirmed: unconfirmedLabels.length });
    labelsAvailable(unconfirmedLabels);
  }

  render() {
    const { error, validating, unconfirmedLabels, confirmed } = this.state;

    let inner;

    if (error) {
      inner = <>
        <Alert variant="danger">
          {error}
        </Alert>
        <CSVReader onFileLoaded={this.handleUploadFile} />
      </>;
    } else if (confirmed === 0 && !validating && !unconfirmedLabels) {
      inner = <CSVReader onFileLoaded={this.handleUploadFile} />;
    } else if (confirmed === 0 && validating && !unconfirmedLabels) {
      inner = <p>Labels are valid, checking availability...</p>
    } else if (confirmed === 0 && !validating && unconfirmedLabels) {
      inner = <>
        <p>Labels are valid and available!</p>
        <ul>
          {unconfirmedLabels.map((label, k) => (
            <li key={k}>{label}</li>
          ))}
        </ul>
        <Button onClick={this.confirm}>Confirm</Button>
      </>;
    } else if (unconfirmedLabels && confirmed !== 0) {
      inner = <p>Confirmed domains to register: {confirmed}</p>;
    }

    return (
      <Container>
        <Row>
          <Col>
            <p>Upload <code>csv</code> file with one column containing the labels to register. Ensure not to use .rsk at the end, lower cases, and no spaces.</p>
            {inner}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  labels: state.app.labels,
});

const mapDispatchToProps = (dispatch) => ({
  labelsAvailable: (labels) => dispatch(labelsAvailable(labels)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseDomains);
