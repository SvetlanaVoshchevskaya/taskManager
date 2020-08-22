import React from 'react';
import * as Icons from 'images/icons';
import PropTypes from 'prop-types';

const Icon = ({ icon, ...rest }) => {
  const Svg = Icons[icon];

  return <Svg {...rest} />;
};

Icon.propTypes = {
  icon: PropTypes.string,
};

Icon.defaultProps = {
  icon: null,
};

export default Icon;
