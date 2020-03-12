import {
  LABELS_AVAILABLE,
  CONFIRM_PRICE,
  CONFIRM_ADDRESS,
  READY,
  SUCCESS_COMMITMENT,
  SUCCES_REGISTER
} from './types';

export const labelsAvailable = (labels) => ({
  type: LABELS_AVAILABLE,
  labels,
});

export const confirmPrice = (duration, cost, totalRif) => ({
  type: CONFIRM_PRICE,
  duration,
  cost,
  totalRif,
});

export const confirmAddress = (ownerAddress) => ({
  type: CONFIRM_ADDRESS,
  ownerAddress,
});

export const ready = (commitmentAmount, registerAmount) => ({
  type: READY,
  commitmentAmount,
  registerAmount,
});

export const commitmentSuccess = () => ({
  type: SUCCESS_COMMITMENT,
});

export const registerSuccess = () => ({
  type: SUCCES_REGISTER,
});

