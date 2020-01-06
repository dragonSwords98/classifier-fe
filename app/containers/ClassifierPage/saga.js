/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_CLASSIFIER } from 'containers/App/constants';
import {
  classifierLoaded,
  classifierLoadingError,
} from 'containers/App/actions';

import request from 'utils/request';

// import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* postImageForClassification(action) {
  // Select username from store
  const requestURL = `http://localhost:8000/predict`;
  const formData = new FormData();
  formData.append('image', action.file[0], 'filename');

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, requestURL, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      body: formData,
    });
    yield put(classifierLoaded(result));
  } catch (err) {
    yield put(classifierLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* classification() {
  // Watches for LOAD_CLASSIFIER actions and calls postImageForClassification when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_CLASSIFIER, postImageForClassification);
}
