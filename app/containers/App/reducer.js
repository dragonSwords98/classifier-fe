/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_CLASSIFIER_SUCCESS,
  LOAD_CLASSIFIER,
  LOAD_CLASSIFIER_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  // TODO: separate state
  classifierLoading: false,
  classifierError: false,
  classifierResult: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      // TODO: make new reducer for classifier
      case LOAD_CLASSIFIER:
        draft.classifierLoading = true;
        draft.classifierError = false;
        draft.classifierResult = false;
        break;
      case LOAD_CLASSIFIER_SUCCESS:
        draft.classifierLoading = false;
        draft.classifierError = false;
        draft.classifierResult = action.response;
        break;
      case LOAD_CLASSIFIER_ERROR:
        draft.classifierLoading = false;
        draft.classifierError = true;
        draft.classifierResult = false;
        break;
    }
  });

export default appReducer;
