import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const DOLLAR_CHAR = '$';

const MoneyInput = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      allowNegative={false}
      prefix={DOLLAR_CHAR}
    />
  );
}

MoneyInput.propTypes = {
  onChange: PropTypes.func
}

export default MoneyInput;