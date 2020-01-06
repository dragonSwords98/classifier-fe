/*
 * ClassifierPage
 *
 * List all the features
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectClassifierLoading,
  makeSelectClassifierResult,
  makeSelectClassifierError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import Form from './Form';
import Input from './Input';
import Section from './Section';

import { loadClassification } from '../App/actions';
// import { changeFilename } from './actions';
import { makeSelectFilename } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'classifier';

export function ClassifierPage({
  filename,
  classifierLoading,
  classifierResult, // {category, probs, text}
  classifierError,
  onRequestClassification,
  // onFileChange,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state filename is not null, submit the form to load classification
    if (filename && filename.trim().length > 0) onRequestClassification();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Classifier Page</title>
        <meta
          name="description"
          content="Classifier Page for Teddy, Grizzly, and Black Bears"
        />
      </Helmet>
      <Section>
        <H2>Upload an image for classification</H2>
        <Form onSubmit={onRequestClassification}>
          <label htmlFor="filename">
            <Input
              id="image"
              type="file"
              accept="image/png, image/jpeg"
              onChange={onRequestClassification}
            />
          </label>
        </Form>
        <div>{classifierResult.text}</div>
        <div>{classifierError}</div>
        <div>{classifierLoading}</div>
      </Section>
    </div>
  );
}

ClassifierPage.propTypes = {
  // classifierFilename: PropTypes.string,
  classifierLoading: PropTypes.bool,
  classifierError: PropTypes.bool, // TODO: error msg
  classifierResult: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onRequestClassification: PropTypes.func,
  filename: PropTypes.string,
  // onFileChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  filename: makeSelectFilename(),
  classifierResult: makeSelectClassifierResult(),
  classifierLoading: makeSelectClassifierLoading(),
  classifiererror: makeSelectClassifierError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    // onFileChange: evt => dispatch(changeFilename(evt.target.value)),
    onRequestClassification: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      const file = evt.target.files || evt.dataTransfer.files;
      dispatch(loadClassification(file));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ClassifierPage);
