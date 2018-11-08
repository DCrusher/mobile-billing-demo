import React from 'react';
import MaskedInput from 'react-text-mask';

const MOBILE_NUMBER_MASK = ['(', /[1-9]/, /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

const TelephoneInput = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={MOBILE_NUMBER_MASK}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

export default TelephoneInput;