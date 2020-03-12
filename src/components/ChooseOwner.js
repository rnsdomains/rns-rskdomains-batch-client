import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isValidChecksumAddress } from 'rskjs-util';
import { Form, Button } from 'react-bootstrap';
import { confirmAddress } from '../actions';

class ChooseOwner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      error: null,
    }

    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  handleChangeAddress(event) {
    const address = event.target.value;

    if (isValidChecksumAddress(address, process.env.REACT_APP_NETWORK_ID)) {
      this.setState(({ address, error: null }));
    } else {
      this.setState({ error: 'Invalid address' });
    }
  }

  confirm(event) {
    event.preventDefault();

    const { confirmAddress } = this.props;
    const { address } = this.state;

    confirmAddress(address);
  }

  render() {
    const { labels, confirmedPrice, ownerAddress } = this.props;
    const { address, error } = this.state;

    if (!labels || !confirmedPrice) return null;

    if (ownerAddress) return <p>Owner address: {ownerAddress}</p>;

    return <Form onSubmit={this.confirm}>
      <Form.Group>
        <Form.Label>Address to own the domains</Form.Label>
        <Form.Control type="text" onChange={this.handleChangeAddress} />
        {error && <Form.Label style={{ color: 'red' }}>{error}</Form.Label>}
        <Button type="submit" disabled={!address || error}>Confirm</Button>
      </Form.Group>
    </Form>;
  }
}

const mapStateToProps = ({ app }) => ({
  labels: app.labels,
  confirmedPrice: app.confirmedPrice,
  ownerAddress: app.ownerAddress,
});

const mapDispatchToProps = (dispatch) => ({
  confirmAddress: (address) => dispatch(confirmAddress(address)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseOwner);
