import React from 'react';
import PropTypes from 'prop-types';
import './loading-spinner.component.scss';

export const LOADING_STATES = {
  loading: 'loading',
  failed: 'failed',
  completed: 'completed'
};

const LoadingSpinner = ({ loadingState, loadingMessage, failedMessage }) => (
  <div>
    {
      loadingState === LOADING_STATES.loading &&
      <div className="loading-spinner">
        <div className="loading-spinner__loader loading"></div>
        <div className="messages">
          {loadingMessage && <span className="loading-spinner__message"> {loadingMessage} </span> }
        </div>
      </div>
    }
    {
      loadingState === LOADING_STATES.failed && (
        <div className="loading-spinner">
          <div className="loading-spinner__loader failed"></div>
          <div className="messages">
            <div>
              {failedMessage && <span className="loading-spinner__message"> { failedMessage } </span> }
              <div className="icon-attribute">Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
          </div>
        </div>
      )
    }
  </div>
);

LoadingSpinner.propTypes = {
  loadingState: PropTypes.string.isRequired,
  loadingMessage: PropTypes.string,
  failedMessage: PropTypes.string
};

export default LoadingSpinner;
