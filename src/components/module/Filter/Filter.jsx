import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
  <input
    type="text"
    name="filter"
    placeholder="Search contacts"
    value={value}
    onChange={onChange}
  />
);

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
