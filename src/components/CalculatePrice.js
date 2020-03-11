import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Web3 from 'web3';
import { confirmPrice } from '../actions';

const web3 = new Web3('https://public-node.rsk.co');
const fifsRegistrar = new web3.eth.Contract([
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "expires",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      }
    ],
    "name": "price",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
], '0x779195c53cc7c1a33bd2eea5f63f2c1da8798d61')

async function getPrice(duration) {
  return fifsRegistrar.methods.price('', 0, duration).call();
}

class CalculatePrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      durationInput: 1,
      duration: 0,
      price: null,
    }

    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  handleDurationChange(event) {
    this.setState({ durationInput: event.target.value });
  }

  setDuration(event) {
    event.preventDefault();

    const duration = Number(this.state.durationInput);
    this.setState({ duration });

    const { labels } = this.props;

    getPrice(duration).then(price => {
      const decimals = web3.utils.toBN('1000000000000000000');

      const rif = web3.utils.toBN(price).mul(web3.utils.toBN(labels.length)).div(decimals);

      const gasPrice = web3.utils.toBN('60000000');
      const gas = web3.utils.toBN('6800000');
      const commits = web3.utils.toBN(Math.ceil(labels.length / 250));
      const reveals = web3.utils.toBN(Math.ceil(labels.length / 35));

      const rbtc = web3.utils.toBN(gasPrice.mul(gas).mul(commits.add(reveals)));

      this.setState({ price: { rif, rbtc }});
    })
  }

  confirm() {
    const { confirmPrice } = this.props;
    confirmPrice();
  }

  render() {
    const { labels, confirmedPrice } = this.props;
    const { duration, durationInput, price } = this.state;

    if (!labels) return null;

    if (duration === 0) {
      return <Form onSubmit={this.setDuration}>
        <Form.Group>
          <Form.Label>For how long do you want to register the domains?</Form.Label>
          <Form.Control onChange={this.handleDurationChange} value={durationInput} type="number" min={1} />
          <Button type="submit">Confirm</Button>
        </Form.Group>
      </Form>
    } else if (duration > 0 && !price) {
      return <p>Calculating price...</p>;
    } else if (duration > 0 && price) {
      return <>
        <p>Price: {price.rif.toString()} RIF Tokens + ~{price.rbtc.toString()} RBTC (wei)</p>
        {!confirmedPrice && <Button onClick={this.confirm}>Confirm</Button>}
      </>;
    } else {
      throw new Error('Unhandled state.')
    }
  }
}

const mapStateToProps = ({ app }) => ({
  labels: app.labels,
  confirmedPrice: app.confirmedPrice,
});

const mapDispatchToProps = (dispatch) => ({
  confirmPrice: () => dispatch(confirmPrice()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalculatePrice);
