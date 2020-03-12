import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {
  LABELS_AVAILABLE,
  CONFIRM_PRICE,
  CONFIRM_ADDRESS,
  SUCCESS_COMMITMENT,
  READY,
} from './types';

const initialState = {
  labels: null,
  confirmedPrice: false,
  duration: 0,
  cost: null,
  totalRif: null,
  ownerAddress: null,
  missingCommitmentConfirmations: -1,
  missingRegisterConfirmations: -1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LABELS_AVAILABLE:
      return {
        ...state,
        labels: action.labels
      };
    case CONFIRM_PRICE:
      return {
        ...state,
        confirmedPrice: true,
        duration: action.duration,
        cost: action.cost,
        totalRif: action.totalRif,
      }
    case CONFIRM_ADDRESS:
      return {
        ...state,
        ownerAddress: action.ownerAddress,
      }
    case READY:
      return {
        ...state,
        missingCommitmentConfirmations: action.commitmentAmount,
        missingRegisterConfirmations: action.registerAmount,
      }
    case SUCCESS_COMMITMENT:
      return {
        ...state,
        missingCommitmentConfirmations: state.missingCommitmentConfirmations-1,
      };
    default: return state;
  }
};

export default (history) => combineReducers({
  router: connectRouter(history),
  app: reducer,
});
