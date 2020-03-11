import { LABELS_AVAILABLE, CONFIRM_PRICE } from './types';

export const labelsAvailable = (labels) => ({
  type: LABELS_AVAILABLE,
  labels,
});

export const confirmPrice = () => ({
  type: CONFIRM_PRICE,
});
