/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { CHANGE_FILENAME } from './constants';

/**
 * Changes the input file field of the form
 *
 * @param  {string} filename The new filename of the input field
 *
 * @return {object} An action object with a type of CHANGE_FILENAME
 */
export function changeFilename(filename) {
  return {
    type: CHANGE_FILENAME,
    filename,
  };
}
