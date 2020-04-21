import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Alert } from 'react-bootstrap';
import Web3 from 'web3';
import { ready, commitmentSuccess, registerSuccess } from '../actions';
import BatchExecutionComponent from './BatchExecutionComponent';

const rlp = require('rlp');

const commitmentChunkSize = 250;
const registerChunkSize = 30;

const web3 = new Web3(process.env.REACT_APP_RSK_NODE);
const fifsRegistrar = new web3.eth.Contract([
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "label",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "nameOwner",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "secret",
        "type": "bytes32"
      }
    ],
    "name": "makeCommitment",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "commitment",
        "type": "bytes32"
      }
    ],
    "name": "canReveal",
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
], process.env.REACT_APP_FIFS_ADDRESS);

function createSecrets(n) {
  const secrets = [];

  for (let i = 0; i < n; i += 1) {
    secrets.push(web3.utils.randomHex(32));
  }

  return secrets;
}

async function makeCommitments(labels, owner, secrets) {
  const commitments = [];

  for (let i = 0; i < labels.length; i += 1) {
    commitments.push(fifsRegistrar.methods.makeCommitment(
      web3.utils.sha3(labels[i]),
      owner,
      secrets[i],
    ).call());
  }

  return Promise.all(commitments);
}

function chunkArray (input, chunkSize) {
  const output = [];

  for (let i = 0; i < input.length; i += chunkSize) {
    output.push(input.slice(i, i + chunkSize));
  }

  return output;
}

/**
 * Validates data for RSK Domains Batch
 * @param {string[]} labels of the domains to be registered
 * @param {address} owner for all registered domains
 * @param {bytes32[]} secrets for each of the names
 * @param {BN} duration for all registered domains
 */
function validate(labels, owner, secrets, duration) {
  if (labels.length !== secrets.length) {
    throw new Error('Invalid amount of secrets');
  }

  for (let i = 0; i < labels.length; i += 1) {
    if (!labels[i].length > 0 || !labels[i].match(/^[0-9a-z]+$/)) {
      throw new Error(`Invalid label: ${labels[i]}`);
    }
  }

  if (!web3.utils.isAddress(owner)) {
    throw new Error('Invalid owner');
  }

  for (let i = 0; i < secrets.length; i += 1) {
    if (!web3.utils.isHexStrict(secrets[i]) || secrets[i].length !== 66) {
      throw new Error(`Invalid secret: ${secrets[i]}`);
    }
  }

  if (!web3.utils.isBN(duration)) {
    throw new Error('Invalid duration');
  }
}

async function pollUntilCommitted(commitmentLists, interval = 5000, timeout = 120000) {
  const lastCommits = [];
  const endTime = Number(new Date()) + timeout;

  for (let i = 0; i < commitmentLists.length; i += 1) {
    lastCommits.push(commitmentLists[i][commitmentLists[i].length - 1]);
  }

  const poll = (resolve, reject) => {
    const allRevealChecks = [];

    for (let i = 0; i < lastCommits.length; i += 1) {
      allRevealChecks.push(fifsRegistrar.methods.canReveal(lastCommits[i]).call());
    }

    Promise.all(allRevealChecks).then((result) => {
      if (result.every((r) => r)) resolve(result);
      else if (Number(new Date()) < endTime) setTimeout(poll, interval, resolve, reject);
      else reject(new Error('Polling timeout'));
    });
  };

  return new Promise(poll);
}

const REGISTER_SIGNATURE = '0xc2c414c8';

/**
 * Encodes one register data to use with transferAndCall.
 * Assumes that parameters were validated with `validate`.
 * @param {string} label of the domain to be registered
 * @param {address} owner for all registered domains
 * @param {bytes32} secret valid for the commitment
 * @param {BN} duration for all registered domains
 */
function encodeOneRegister(label, owner, secret, duration) {
  const parsedOwner = owner.toLowerCase().slice(2);

  const parsedSecret = secret.slice(2);

  const parsedDuration = web3.utils.padLeft(
    web3.utils.numberToHex(duration).slice(2),
    64,
    '0',
  );

  const parsedLabel = web3.utils.asciiToHex(label).slice(2);

  return `${REGISTER_SIGNATURE}${parsedOwner}${parsedSecret}${parsedDuration}${parsedLabel}`;
}

/**
 * Encodes (rlp) register data to use with transferAndCall.
 * Assumes that parameters were validated with `validate`.
 * @param {string[]} labels of the domains to be registered
 * @param {address} owner for all registered domains
 * @param {bytes32[]} secrets for each of the names
 * @param {BN} duration for all registered domains
 * @param {Promise<BN>} price contract function for `price`
 */
function encodeRegister(labels, owner, secrets, duration, cost) {
  const datas = [];

  for (let i = 0; i < labels.length; i += 1) {
    datas.push(encodeOneRegister(labels[i], owner, secrets[i], duration));
  }

  const data = `0x${rlp.encode([cost, datas]).toString('hex')}`;

  return {
    size: labels.length,
    data
  };
}

class ExecuteRegistrations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      makingCommitments: false,
      chunkedCommitments: null,
      chunkedDatas: null,
      from: null,
      startedPolling: false,
      canReveal: false,
      batch: null,
      rif: null,
    }

    this.createCommitments = this.createCommitments.bind(this);
    this.enableWallet = this.enableWallet.bind(this);
  }

  createCommitments() {
    const { labels, ownerAddress, duration, ready, cost } = this.props;

    if (labels) {
      const secrets = createSecrets(labels.length);

      const chunkedLabels = chunkArray(labels, registerChunkSize);
      const chunkedSecrets = chunkArray(secrets, registerChunkSize);

      const chunkedDatas = [];

      for (let i = 0; i < chunkedLabels.length; i += 1) {
        validate(chunkedLabels[i], ownerAddress.toLowerCase(), chunkedSecrets[i], duration);
        chunkedDatas.push(encodeRegister(chunkedLabels[i], ownerAddress.toLowerCase(), chunkedSecrets[i], duration, cost));
      }

      this.setState({ chunkedDatas });

      makeCommitments(labels, ownerAddress.toLowerCase(), secrets).then(commitments => {
        const chunkedCommitments = chunkArray(commitments, commitmentChunkSize);

        ready(chunkedCommitments.length, chunkedDatas.length);

        this.setState({ chunkedCommitments });
      });
    }
  }

  enableWallet() {
    window.ethereum.enable().then(accounts => this.setState({ from: accounts[0] }));

    const web3enabled = new Web3(window.web3);

    const batch = new web3enabled.eth.Contract([
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "bytes32[]",
            "name": "commitments",
            "type": "bytes32[]"
          }
        ],
        "name": "batchCommit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ], process.env.REACT_APP_BATCH_ADDRESS);

    const rif = new web3enabled.eth.Contract([
      {
        "constant": false,
        "inputs": [
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          },
          {
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "transferAndCall",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ], process.env.REACT_APP_RIF_ADDRESS);

    this.setState({ batch, rif });
  }

  shouldComponentUpdate({ missingCommitmentConfirmations }, { canReveal, startedPolling }) {
    if (missingCommitmentConfirmations === 0 && !canReveal && !startedPolling) {
      const { chunkedCommitments } = this.state;
      pollUntilCommitted(chunkedCommitments, 5000, 1200000).then(() => this.setState({ canReveal: true, startedPolling: true }));
    }

    return true;
  }

  render() {
    const {
      labels,
      confirmedPrice,
      ownerAddress,
      missingCommitmentConfirmations,
      missingRegisterConfirmations,
      commitmentSuccess,
      registerSuccess,
      cost,
    } = this.props;
    const {
      chunkedCommitments,
      chunkedDatas,
      from,
      canReveal,
      batch,
      rif,
    } = this.state;

    if (!labels || !confirmedPrice || !ownerAddress) return null;

    if (!chunkedCommitments || !chunkedDatas) {
      return <>
        <p>Prepare transactions transactions</p>
        <Button onClick={this.createCommitments}>Prepare</Button>
      </>
    } else if (!from) {
      return <Button onClick={this.enableWallet}>Enable wallet</Button>
    } else if (from && chunkedCommitments) {
      return <>
        <p>Wallet address: {from}</p>
        <Container>
        {
          chunkedCommitments.map((commitments, i) => (
            <BatchExecutionComponent
              key={i}
              from={commitmentChunkSize * i + 1}
              to={commitmentChunkSize * (i + 1) >= labels.length ? labels.length : commitmentChunkSize * (i + 1)}
              sender={from}
              method={batch.methods.batchCommit(commitments)}
              success={commitmentSuccess}
            />
          ))
        }
        </Container>
        {
          missingCommitmentConfirmations === 0 && !canReveal && <p>Polling until committed... this can take more than a minute.</p>
        }
        {
          missingCommitmentConfirmations === 0 && canReveal && <>
            <p>Ready! Time to register!</p>
            <Container>
              {
                chunkedDatas.map((datas, i) => (
                  <BatchExecutionComponent
                    key={i}
                    from={registerChunkSize * i + 1}
                    to={registerChunkSize * (i + 1) >= labels.length ? labels.length : registerChunkSize * (i + 1)}
                    sender={from}
                    method={rif.methods.transferAndCall(process.env.REACT_APP_BATCH_ADDRESS, cost.mul(web3.utils.toBN(datas.size)), datas.data)}
                    success={registerSuccess}
                  />
                ))
              }
            </Container>
          </>
        }
        {
          missingRegisterConfirmations === 0 && <Alert variant="success">
            Success! Thanks for registering.
          </Alert>
        }
      </>
    } else {
      throw new Error('Unhandled state.');
    }
  }
}

const mapStateToProps = ({ app }) => ({
  labels: app.labels,
  confirmedPrice: app.confirmedPrice,
  duration: app.duration,
  cost: app.cost,
  ownerAddress: app.ownerAddress,
  missingCommitmentConfirmations: app.missingCommitmentConfirmations,
  missingRegisterConfirmations: app.missingRegisterConfirmations,
});

const mapDispatchToProps = (dispatch) => ({
  ready: (commitmentAmount, registerAmount) => dispatch(ready(commitmentAmount, registerAmount)),
  commitmentSuccess: () => dispatch(commitmentSuccess()),
  registerSuccess: () => dispatch(registerSuccess()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExecuteRegistrations);
