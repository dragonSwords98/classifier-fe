/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectClassifier = state => state.classifier || initialState;

const makeSelectFilename = () =>
  createSelector(
    selectClassifier,
    classifierState => classifierState.filename,
  );

export { selectClassifier, makeSelectFilename };
