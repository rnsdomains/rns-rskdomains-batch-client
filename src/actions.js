import { LABELS_AVAILABLE } from './types';

export const labelsAvailable = (labels) => ({
  type: LABELS_AVAILABLE,
  labels,
});
