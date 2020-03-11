import { LABELS_AVAILABLE, CONFIRM_PRICE, CONFIRM_ADDRESS } from './types';

export const labelsAvailable = (labels) => ({
  type: LABELS_AVAILABLE,
  labels,
});

export const confirmPrice = () => ({
  type: CONFIRM_PRICE,
});

export const confirmAddress = (ownerAddress) => ({
  type: CONFIRM_ADDRESS,
  ownerAddress,
});
