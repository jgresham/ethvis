import React from 'react';
import PropTypes from 'prop-types';

/**
 * Primary UI component for user interaction
 */
export const Clients = ({ executionClient, consensusClient, ...props }) => {
  return (
    <p>
      <strong>Execution client:</strong> {executionClient}
      <strong>Consensus client:</strong> {consensusClient}
  </p>
  );
};

Clients.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
   consensusClient: PropTypes.string,
  /**
   * What background color to use
   */
   executionClient: PropTypes.string,
};

Clients.defaultProps = {
  consensusClient: null,
  executionClient: null
};
